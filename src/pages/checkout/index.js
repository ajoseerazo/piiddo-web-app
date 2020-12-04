import { useState, useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ordersActions from "../../redux/actions/orders";
import couponsActions from "../../redux/actions/coupons";
import { round } from "../../utils";
import {
  Wrapper,
  CheckoutTitle,
  CheckoutContent,
  CheckoutContentLeft,
  CheckoutContentRight,
  CheckoutBox,
  CheckoutAddress,
  CheckoutPaymentMethod,
  CheckoutCoupon,
  CheckoutProductsSummary,
  CheckoutSummaryItem,
  CheckoutSummaryItemTitle,
  CheckoutSummaryItemPrice,
  CheckoutTotal,
  CheckoutTotalTitle,
  CheckoutTotalPrice,
  CheckoutButton,
  CheckoutBoxTitle,
  CheckoutAddressText,
  CheckoutTimeContainer,
  PaymentMethodSelected,
  PaymentMethodSelectedTitle,
  PaymentMethodChangeButton,
  CashAmount,
  CheckoutInput,
  CheckoutPersonalDataGroup,
  CheckboxWrapper,
  PaypalButtonWrapper,
  PayPalButtonDisabling,
  CouponForm,
  Coupon,
} from "./styled";
import PrettyCheckbox from "../../components/PrettyCheckbox";
import PaymentMethods from "../../components/PaymentMethods";
import ShoppingBoxList from "../../components/ShoppingBoxList";
import LoadingSpinner from "../../components/LoadingSpinner";
import PaymentSupportModal from "../../components/PaymentSupportModal";
import CreditCardForm from "../../components/CreditCardForm";
import paymentsActions from "../../redux/actions/payments";
import PaymentSuccessModal from "../../components/PaymentSuccessModal";
import { PayPalButton } from "react-paypal-button-v2";
import Toolbar from "../../components/Toolbar";
import QRModal from "../../components/QRModal";
import Router from "next/router";
import { getDataFromShoppingCart } from "../../utils";
import useUser from "../../hooks/useUser";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

const { createOrder, setOrderPaymentSupport } = ordersActions;
const { doPayment } = paymentsActions;
const { getCoupon } = couponsActions;

const DASH_DISCOUNT = 0.1;

const DOLLAR_BASE = 1150000;
const DOLLAR_PRICE = DOLLAR_BASE + DOLLAR_BASE * 0.1;

const CheckoutPage = ({
  stores,
  address,
  actions: { createOrder, setOrderPaymentSupport, doPayment, getCoupon },
  isCreatingOrder,
  order,
  orderCreated,
  settingPaymentSupport,
  paymentSupportSent,
  isDoingPayment,
  paymentSuccess,
  length,
  total,
  deliveryTotal,
  deliveryLocation,
  loadingCoupon,
  coupon,
  rideRequest,
}) => {
  const [paymentMethodSelected, setPaymentMethodSelected] = useState();
  const [showPaymentMethods, setShowPaymentMethods] = useState(true);
  const [name, setName] = useState();
  const [extraAddress, setExtraAddress] = useState();
  const [extraFromAddress, setExtraFromAddress] = useState();
  const [extraToAddress, setExtraToAddress] = useState();
  const [number, setNumber] = useState();
  const [receiverName, setReceiverName] = useState();
  const [receiverNumber, setReceiverNumber] = useState();
  const [email, setEmail] = useState();
  const [vuelto, setVuelto] = useState(null);
  const [isSamePerson, setIsSamePerson] = useState(false);
  const [shouldOpenSupportModal, setShouldOpenSupportModal] = useState(false);
  const [creditCard, setCreditCard] = useState();
  const [
    shouldOpenPaymentSuccessModal,
    setShouldOpenPaymentSuccessModal,
  ] = useState(false);
  const [paypalPaymentSuccess, setPaypalPaymentSuccess] = useState(false);
  const [billName, setBillName] = useState();
  const [billLastName, setBillLastName] = useState();
  const [billDNI, setBillDNI] = useState();
  const [billAddress, setBillAddress] = useState();
  const [qrModalOpened, setQrModalOpened] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const [finalTotal, setFinalTotal] = useState(total || 0);
  const [finalDelivery, setFinalDelivery] = useState(deliveryTotal);
  const [finalAmount, setFinalAmount] = useState(total + deliveryTotal);
  const [couponApplied, setCouponApplied] = useState(false);
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const user = useUser();
  const router = useRouter();
  const [dashDiscount, setDashdiscount] = useState(false);

  const { type } = router.query;

  const { addToast } = useToasts();

  const selectPaymentMethod = useCallback(
    (paymentMethod) => {
      setPaymentMethodSelected(paymentMethod);
      setShowPaymentMethods(false);
    },
    [setPaymentMethodSelected]
  );

  const toggleSamePerson = useCallback(() => {
    setIsSamePerson(!isSamePerson);
  }, [isSamePerson]);

  const handleInputChange = useCallback((key, { target: { value } }) => {
    const func = `set${key[0].toUpperCase()}${key.substr(1)}('${value}')`;

    eval(func);
  });

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
    } else {
      if (user === null) {
        router.push("/ingresar?redirect_to=checkout");
      }
    }
  }, [user]);

  const confirmOrder = useCallback(async () => {
    const payload =
      type !== "piiddo-go"
        ? {
            address: address,
            name,
            number,
            email,
            receiverName: isSamePerson ? name : receiverName,
            receiverNumber: isSamePerson ? number : receiverNumber,
            paymentMethodSelected,
            extraAddress,
            vuelto,
            stores,
            deliveryLocation,
            total: finalTotal,
            deliveryTotal: finalDelivery,
          }
        : {
            name,
            paymentMethodSelected,
            number,
            email,
            ...rideRequest,
            vuelto,
            extraFromAddress,
            extraToAddress,
            type: "piiddo-go",
          };

    if (type !== "piiddo-go") {
      if (!address) {
        alert("Debes ingresar tu dirección. Ingresala en la barra superior");
        return;
      }
    }

    if (coupon && couponApplied && !invalidCoupon) {
      payload.coupon = coupon.code;
    }

    if (
      paymentMethodSelected.value === "credit-card" ||
      paymentMethodSelected.value === "debit-card"
    ) {
      const [firstName, lastName] = creditCard.name.split(" ");
      const result = await doPayment({
        card: creditCard,
        bill: {
          firstName: billName,
          lastName: billLastName,
          address: billAddress,
          email,
          documentType: "DNI",
          documentNumber: billDNI,
        },
        amount: finalAmount,
      });

      if (result && result.success) {
        payload.paymentStatus = "COMPLETED";
        createOrder(payload);
      } else {
        alert("Ocurrió un error procesando el pago");
      }
    } else {
      if (paymentMethodSelected.value === "remepagos") {
        setQrModalOpened(true);
      } else {
        createOrder(payload);
      }
    }
  }, [
    name,
    number,
    email,
    receiverName,
    receiverNumber,
    paymentMethodSelected,
    extraAddress,
    vuelto,
    isSamePerson,
    address,
    stores,
    createOrder,
    doPayment,
    total,
    deliveryTotal,
    creditCard,
    deliveryLocation,
    billName,
    billAddress,
    billDNI,
    billLastName,
    coupon,
    finalDelivery,
    finalTotal,
    couponApplied,
    invalidCoupon,
    rideRequest,
    type,
    extraFromAddress,
    extraToAddress,
  ]);

  useEffect(() => {
    if (orderCreated && paymentMethodSelected) {
      if (
        paymentMethodSelected.value === "pago-movil" ||
        paymentMethodSelected.value === "bank-transfer" ||
        paymentMethodSelected.value === "zelle"
      ) {
        setShouldOpenSupportModal(true);
      } else {
        if (
          paymentMethodSelected.value === "credit-card" ||
          paymentMethodSelected.value === "debit-card"
        ) {
          setShouldOpenPaymentSuccessModal(true);
        } else {
          if (paymentMethodSelected.value === "paypal") {
            setShouldOpenPaymentSuccessModal(true);
          } else {
            if (paymentMethodSelected.value === "cryptocoins") {
              window.location = `https://payments.criptopagos.co?amount=${round(
                finalAmount,
                2
              )}&apiKey=${"960d52033f7a2e5b28d272b83be43aa4aee6646a570a909d6dc37972a0ea4cee"}&accountID=${`41513570`}&merchantID=${`90361928`}&invoice=${
                order.id
              }&currency=DASH&callbackURL=${
                window.location.origin
              }/criptopayments/${order.id}`;
            } else {
              Router.push(`/orders/${order.id}/eta`);
            }
          }
        }
      }
    }
  }, [orderCreated, paymentMethodSelected, order]);

  const onFinishPayment = useCallback(
    ({ supportUrl }) => {
      setOrderPaymentSupport(order.id, supportUrl);
    },
    [order]
  );

  const onChangeCreditCardData = useCallback(
    (cc) => {
      if (cc.cvc && cc.name && cc.number && cc.expiry) {
        setCreditCard(cc);
      } else {
        setCreditCard(null);
      }
    },
    [setCreditCard]
  );

  const onPaypalPaymentSuccess = useCallback(
    (details, data) => {
      setPaypalPaymentSuccess(true);

      // console.log(details);

      // console.log("Transaction completed by " + details.payer.name.given_name);

      const payload =
        type !== "piiddo-go"
          ? {
              address: address || "",
              name,
              number,
              email,
              receiverName: isSamePerson ? name : receiverName,
              receiverNumber: isSamePerson ? number : receiverNumber,
              paymentMethodSelected,
              extraAddress,
              vuelto,
              stores,
              paymentStatus: "COMPLETED",
              paymentDetails: details,
            }
          : {
              name,
              number,
              email,
              paymentMethodSelected,
              paymentStatus: "COMPLETED",
              paymentDetails: details,
              ...rideRequest,
              type,
              extraFromAddress,
              extraToAddress,
            };

      if (coupon && couponApplied && !invalidCoupon) {
        payload.coupon = coupon.code;
      }

      createOrder(payload);
    },
    [
      name,
      number,
      email,
      receiverName,
      receiverNumber,
      paymentMethodSelected,
      extraAddress,
      vuelto,
      isSamePerson,
      address,
      stores,
      createOrder,
      doPayment,
      total,
      deliveryTotal,
      finalDelivery,
      finalTotal,
      creditCard,
      setPaypalPaymentSuccess,
      coupon,
      couponApplied,
      invalidCoupon,
      type,
      rideRequest,
      extraFromAddress,
      extraToAddress,
    ]
  );

  const onPayPalPaymentError = useCallback((error) => {
    console.log(error);
  });

  const isCheckoutButtonDisabled = useMemo(() => {
    if (!rideRequest) {
      if (!name || !number || !email || !extraAddress) {
        return true;
      }

      if (!isSamePerson) {
        if (!receiverNumber || !receiverName) {
          return true;
        }
      }

      if (!paymentMethodSelected) {
        return true;
      } else {
        switch (paymentMethodSelected.value) {
          case "cash-bs":
          case "cash-usd":
            if (Number.isNaN(parseFloat(vuelto))) {
              return true;
            } else {
              return false;
            }
          case "credit-card":
          case "debit-card":
            if (!creditCard) {
              return true;
            }
          default:
            return false;
        }
      }
    } else {
      if (!number) {
        return true;
      }

      if (!paymentMethodSelected) {
        return true;
      } else {
        switch (paymentMethodSelected.value) {
          case "cash-bs":
          case "cash-usd":
            if (Number.isNaN(parseFloat(vuelto))) {
              return true;
            } else {
              return false;
            }
          case "credit-card":
          case "debit-card":
            if (!creditCard) {
              return true;
            }
          default:
            return false;
        }
      }
    }
  }, [
    paymentMethodSelected,
    name,
    number,
    email,
    extraAddress,
    isSamePerson,
    receiverName,
    receiverNumber,
    vuelto,
    creditCard,
    rideRequest,
  ]);

  const closeQRModal = useCallback(() => {
    setQrModalOpened(false);
  }, []);

  const verifyCoupon = useCallback(() => {
    getCoupon(couponCode);
  }, [couponCode]);

  useEffect(() => {
    if (coupon === "not-valid" && !loadingCoupon) {
      addToast(`Cupón no válido`, {
        appearance: "error",
        autoDismiss: true,
      });
      setInvalidCoupon(true);
    } else {
      if (coupon && coupon.id && !loadingCoupon) {
        if (!coupon.isPersonal) {
          if (coupon.maxLimit) {
            if (finalAmount <= coupon.maxLimit) {
              addToast(`Cupón aplicado exitosamente`, {
                appearance: "success",
                autoDismiss: true,
              });
              setInvalidCoupon(false);
            } else {
              addToast(
                `El valor del pedido supera el monto máximo del cupón que son ${coupon.maxLimit}$`,
                {
                  appearance: "error",
                  autoDismiss: true,
                }
              );
              setInvalidCoupon(true);
            }
          } else {
            addToast(`Cupón aplicado exitosamente`, {
              appearance: "success",
              autoDismiss: true,
            });
            setInvalidCoupon(false);
          }
        } else {
          if (coupon.uid === user.uid) {
            if (coupon.maxLimit) {
              if (finalAmount <= coupon.maxLimit) {
                addToast(`Cupón aplicado exitosamente`, {
                  appearance: "success",
                  autoDismiss: true,
                });
                setInvalidCoupon(false);
              } else {
                addToast(
                  `El valor del pedido supera el monto máximo del cupón que son ${coupon.maxLimit}$`,
                  {
                    appearance: "error",
                    autoDismiss: true,
                  }
                );
                setInvalidCoupon(true);
              }
            } else {
              addToast(`Cupón aplicado exitosamente`, {
                appearance: "success",
                autoDismiss: true,
              });
              setInvalidCoupon(false);
            }
          } else {
            addToast(`Cupón no válido para este usuario`, {
              appearance: "error",
              autoDismiss: true,
            });
            setInvalidCoupon(true);
          }
        }
      }
    }
  }, [user, coupon, loadingCoupon]);

  useEffect(() => {
    if (coupon && coupon.id && !couponApplied && !invalidCoupon) {
      switch (coupon.type) {
        case "DELIVERY":
          if (coupon.discount.type === "percentage") {
            setCouponApplied(true);
            setFinalDelivery(
              deliveryTotal - (deliveryTotal * coupon.discount.amount) / 100
            );
          } else {
            setCouponApplied(true);
            setFinalDelivery(deliveryTotal - coupon.discount.amount);
          }
          break;
        case "TOTAL":
          if (coupon.discount.type === "percentage") {
            setCouponApplied(true);
            setFinalAmount(
              finalAmount - (finalAmount * coupon.discount.amount) / 100
            );
          } else {
            setCouponApplied(true);
            setFinalAmount(
              coupon.discount.amount > finalAmount
                ? 0
                : finalAmount - coupon.discount.amount
            );
          }
          break;
        default:
          break;
      }
    }
  }, [total, deliveryTotal, coupon, finalAmount, invalidCoupon, couponApplied]);

  useEffect(() => {
    setFinalAmount(finalTotal + finalDelivery);
  }, [finalTotal, finalDelivery]);

  /*useEffect(() => {
    const total = finalTotal + finalDelivery;

    if (paymentMethodSelected && paymentMethodSelected.value === "cryptocoins") {
      setFinalAmount(total - total * DASH_DISCOUNT);
    } else {
      setFinalAmount(total);
    }
  }, [paymentMethodSelected]);*/

  let deliveryEta = 0;
  for (let key in stores) {
    deliveryEta = deliveryEta + stores[key].eta || 40;
  }

  deliveryEta = deliveryEta / Object.keys(stores).length;

  useEffect(() => {
    if (rideRequest) {
      setFinalDelivery(rideRequest.price);
    }
  }, [rideRequest]);

  console.log("RequestRide", rideRequest);

  return (
    <>
      <Wrapper>
        <div>
          <CheckoutTitle>
            Confirmar {type === "piiddo-go" ? "viaje" : "orden"}
          </CheckoutTitle>

          <CheckoutContent>
            <CheckoutContentLeft>
              <CheckoutBox>
                {type !== "piiddo-go" ? (
                  <CheckoutAddress>
                    <div>
                      <CheckoutBoxTitle>Dirección</CheckoutBoxTitle>
                      <CheckoutAddressText>{address}</CheckoutAddressText>
                    </div>

                    <CheckoutPersonalDataGroup>
                      <label>¿Cómo llegar? *</label>
                      <CheckoutInput
                        placeholder="Escribe la dirección exacta, puntos de referencias, etc"
                        onChange={handleInputChange.bind(this, "extraAddress")}
                      />
                    </CheckoutPersonalDataGroup>

                    <CheckoutTimeContainer>
                      <span>
                        Tiempo aprox. de{" "}
                        {type === "piiddo-go" ? "recogida" : "entrega"}
                      </span>
                      <span>
                        {type !== "piiddo-go"
                          ? parseFloat(deliveryEta).toFixed(0)
                          : "10"}{" "}
                        mins
                      </span>
                    </CheckoutTimeContainer>
                  </CheckoutAddress>
                ) : (
                  <CheckoutAddress>
                    <div>
                      <CheckoutBoxTitle>Desde</CheckoutBoxTitle>
                      <CheckoutAddressText>
                        {rideRequest.fromPlace.value}
                      </CheckoutAddressText>
                    </div>

                    <CheckoutPersonalDataGroup
                      style={{
                        marginBottom: 15,
                      }}
                    >
                      <label>¿Cómo llegar al punto de partida?</label>
                      <CheckoutInput
                        placeholder="Escribe la dirección exacta, puntos de referencias, etc"
                        onChange={handleInputChange.bind(
                          this,
                          "extraFromAddress"
                        )}
                      />
                    </CheckoutPersonalDataGroup>

                    <div>
                      <CheckoutBoxTitle>Hasta</CheckoutBoxTitle>
                      <CheckoutAddressText>
                        {rideRequest.toPlace.value}
                      </CheckoutAddressText>
                    </div>

                    <CheckoutPersonalDataGroup>
                      <label>¿Cómo llegar al destino?</label>
                      <CheckoutInput
                        placeholder="Escribe la dirección exacta, puntos de referencias, etc"
                        onChange={handleInputChange.bind(
                          this,
                          "extraToAddress"
                        )}
                      />
                    </CheckoutPersonalDataGroup>

                    <CheckoutTimeContainer>
                      <span>
                        Tiempo aprox. de{" "}
                        {type === "piiddo-go" ? "recogida" : "entrega"}
                      </span>
                      <span>
                        {type !== "piiddo-go"
                          ? parseFloat(deliveryEta).toFixed(0)
                          : "10"}{" "}
                        mins
                      </span>
                    </CheckoutTimeContainer>
                  </CheckoutAddress>
                )}
              </CheckoutBox>

              <CheckoutBox>
                <CheckoutBoxTitle>Tus datos</CheckoutBoxTitle>

                <CheckoutPersonalDataGroup>
                  <label>Nombre *</label>
                  <CheckoutInput
                    defaultValue={user ? user.displayName : undefined}
                    placeholder="Tu nombre"
                    onChange={handleInputChange.bind(this, "name")}
                    readOnly={!!user}
                  />
                </CheckoutPersonalDataGroup>

                <CheckoutPersonalDataGroup>
                  <label>Número de teléfono *</label>
                  <CheckoutInput
                    placeholder="Tu número de teléfono"
                    onChange={handleInputChange.bind(this, "number")}
                  />
                </CheckoutPersonalDataGroup>

                <CheckoutPersonalDataGroup>
                  <label>Correo *</label>
                  <CheckoutInput
                    defaultValue={user ? user.email : undefined}
                    placeholder="Tu correo electrónico"
                    onChange={handleInputChange.bind(this, "email")}
                  />
                </CheckoutPersonalDataGroup>
              </CheckoutBox>

              {type !== "piiddo-go" && (
                <CheckoutBox>
                  <CheckoutBoxTitle>
                    Datos de la persona que recibe
                  </CheckoutBoxTitle>

                  <CheckboxWrapper>
                    <PrettyCheckbox
                      label={"Quien recibe es la misma persona"}
                      onChange={toggleSamePerson}
                    />
                  </CheckboxWrapper>

                  {!isSamePerson && (
                    <>
                      <CheckoutPersonalDataGroup>
                        <label>Nombre *</label>
                        <CheckoutInput
                          placeholder="Nombre de la persona que recibe"
                          onChange={handleInputChange.bind(
                            this,
                            "receiverName"
                          )}
                        />
                      </CheckoutPersonalDataGroup>

                      <CheckoutPersonalDataGroup>
                        <label>Número de teléfono *</label>
                        <CheckoutInput
                          placeholder="Número de teléfono de la persona que recibe"
                          onChange={handleInputChange.bind(
                            this,
                            "receiverNumber"
                          )}
                        />
                      </CheckoutPersonalDataGroup>
                    </>
                  )}
                </CheckoutBox>
              )}

              <CheckoutBox>
                <CheckoutBoxTitle>Cupón de descuento</CheckoutBoxTitle>

                <CheckoutPersonalDataGroup>
                  <CouponForm>
                    <label>Cupón</label>

                    {!couponApplied || invalidCoupon ? (
                      <>
                        <CheckoutInput
                          placeholder="Ingresa un cupón"
                          onChange={handleInputChange.bind(this, "couponCode")}
                        />

                        <CheckoutButton
                          disabled={!couponCode || loadingCoupon}
                          onClick={verifyCoupon}
                          loading={loadingCoupon}
                        >
                          {!loadingCoupon ? "Validar" : <LoadingSpinner />}
                        </CheckoutButton>
                      </>
                    ) : (
                      <Coupon>{coupon.name}</Coupon>
                    )}
                  </CouponForm>
                </CheckoutPersonalDataGroup>
              </CheckoutBox>

              <CheckoutBox>
                <CheckoutPaymentMethod>
                  <CheckoutBoxTitle>Método de pago</CheckoutBoxTitle>

                  {showPaymentMethods && (
                    <PaymentMethods
                      onSelectOption={selectPaymentMethod}
                      value={paymentMethodSelected}
                    />
                  )}

                  {paymentMethodSelected ? (
                    <>
                      <>
                        {!showPaymentMethods && (
                          <PaymentMethodSelected>
                            <PaymentMethodSelectedTitle>
                              {paymentMethodSelected.name}
                            </PaymentMethodSelectedTitle>

                            <PaymentMethodChangeButton
                              onClick={() => {
                                setShowPaymentMethods(true);
                              }}
                            >
                              Cambiar
                            </PaymentMethodChangeButton>
                          </PaymentMethodSelected>
                        )}
                      </>

                      <>
                        {(paymentMethodSelected.value === "cash-bs" ||
                          paymentMethodSelected.value === "cash-usd") && (
                          <CashAmount>
                            <CheckoutInput
                              placeholder="Indique la cantidad que debemos llevar de vuelto"
                              onChange={handleInputChange.bind(this, "vuelto")}
                              value={vuelto}
                            />
                          </CashAmount>
                        )}
                      </>

                      <>
                        {(paymentMethodSelected.value === "credit-card" ||
                          paymentMethodSelected.value === "debit-card") && (
                          <>
                            <CreditCardForm onChange={onChangeCreditCardData} />

                            <div
                              style={{
                                marginTop: 30,
                              }}
                            >
                              <CheckoutBoxTitle>
                                Datos de facturación de la tarjeta
                              </CheckoutBoxTitle>

                              <CheckoutPersonalDataGroup>
                                <label>Nombre *</label>
                                <CheckoutInput
                                  placeholder="Nombre"
                                  onChange={handleInputChange.bind(
                                    this,
                                    "billName"
                                  )}
                                />
                              </CheckoutPersonalDataGroup>

                              <CheckoutPersonalDataGroup>
                                <label>Apellido *</label>
                                <CheckoutInput
                                  placeholder="Apellido"
                                  onChange={handleInputChange.bind(
                                    this,
                                    "billLastName"
                                  )}
                                />
                              </CheckoutPersonalDataGroup>

                              <CheckoutPersonalDataGroup>
                                <label>Número de documento *</label>
                                <CheckoutInput
                                  placeholder="Numero de documento"
                                  onChange={handleInputChange.bind(
                                    this,
                                    "billDNI"
                                  )}
                                />
                              </CheckoutPersonalDataGroup>

                              <CheckoutPersonalDataGroup>
                                <label>Dirección *</label>
                                <CheckoutInput
                                  placeholder="Dirección de facturación"
                                  onChange={handleInputChange.bind(
                                    this,
                                    "billAddress"
                                  )}
                                />
                              </CheckoutPersonalDataGroup>
                            </div>
                          </>
                        )}
                      </>
                    </>
                  ) : null}
                </CheckoutPaymentMethod>
              </CheckoutBox>

              {/*<CheckoutBox>
              <CheckoutCoupon>Cupón</CheckoutCoupon>
            </CheckoutBox>*/}

              {type !== "piiddo-go" && (
                <CheckoutBox>
                  <CheckoutProductsSummary>
                    <CheckoutBoxTitle>Tu orden</CheckoutBoxTitle>

                    {Object.keys(stores).map((storeId) => {
                      return (stores[storeId].items || []).map(
                        (item, index) => {
                          return (
                            <ShoppingBoxList
                              key={`${storeId}-${index}`}
                              order={item}
                              forceActive={true}
                              disableCounters
                            />
                          );
                        }
                      );
                    })}
                  </CheckoutProductsSummary>
                </CheckoutBox>
              )}
            </CheckoutContentLeft>

            <CheckoutContentRight>
              <CheckoutBox>
                {type !== "piiddo-go" && (
                  <CheckoutSummaryItem>
                    <CheckoutSummaryItemTitle>
                      Productos
                    </CheckoutSummaryItemTitle>
                    <CheckoutSummaryItemPrice>
                      ${parseFloat(finalTotal).toFixed(2)}
                    </CheckoutSummaryItemPrice>
                  </CheckoutSummaryItem>
                )}

                <CheckoutSummaryItem>
                  <CheckoutSummaryItemTitle>
                    {type !== "piiddo-go" ? "Delivery" : "Viaje"}
                  </CheckoutSummaryItemTitle>
                  <CheckoutSummaryItemPrice>
                    ${parseFloat(finalDelivery).toFixed(2)}
                  </CheckoutSummaryItemPrice>
                </CheckoutSummaryItem>

                <CheckoutTotal>
                  <div>
                    <CheckoutTotalTitle>Total</CheckoutTotalTitle>
                    <CheckoutTotalPrice>
                      ${parseFloat(finalAmount).toFixed(2)}
                    </CheckoutTotalPrice>
                  </div>

                  <div>
                    <CheckoutTotalTitle>Total Bs</CheckoutTotalTitle>
                    <CheckoutTotalPrice>
                      Bs{" "}
                      {`${new Intl.NumberFormat("es").format(
                        finalAmount * DOLLAR_PRICE
                      )}`}
                    </CheckoutTotalPrice>
                  </div>
                </CheckoutTotal>

                {!isCreatingOrder &&
                !isDoingPayment &&
                !paypalPaymentSuccess &&
                paymentMethodSelected &&
                paymentMethodSelected.value === "paypal" ? (
                  <PaypalButtonWrapper>
                    {isCheckoutButtonDisabled && <PayPalButtonDisabling />}
                    <PayPalButton
                      amount={parseFloat(
                        `${finalAmount + finalAmount * 0.15 + 0.3}`
                      ).toFixed(2)}
                      shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      onSuccess={onPaypalPaymentSuccess}
                      options={{
                        clientId:
                          "AVrBWgvqybeqh7m5jzwLfLF6pHFP4JhSUZNkLwQCSapEPahVQWwoNIwD92HICSAO83BDg-u-zuFADVia",
                      }}
                      onError={onPayPalPaymentError}
                    />
                  </PaypalButtonWrapper>
                ) : (
                  <CheckoutButton
                    onClick={confirmOrder}
                    disabled={
                      isCreatingOrder ||
                      isCheckoutButtonDisabled ||
                      orderCreated
                    }
                  >
                    {(isCreatingOrder || isDoingPayment) && <LoadingSpinner />}
                    {!isCreatingOrder && !isDoingPayment && (
                      <span>
                        {type !== "piiddo-go"
                          ? "Realizar pedido"
                          : "Confirmar viaje"}
                      </span>
                    )}
                  </CheckoutButton>
                )}
              </CheckoutBox>
            </CheckoutContentRight>
          </CheckoutContent>
        </div>

        {order &&
          paymentMethodSelected &&
          (paymentMethodSelected.value === "pago-movil" ||
            paymentMethodSelected.value === "bank-transfer" ||
            paymentMethodSelected.value === "zelle") && (
            <PaymentSupportModal
              isOpened={shouldOpenSupportModal}
              type={paymentMethodSelected.value}
              amount={
                paymentMethodSelected.value === "zelle"
                  ? finalAmount
                  : finalAmount * DOLLAR_PRICE
              }
              orderId={order.id}
              onFinishPayment={onFinishPayment}
              isLoading={settingPaymentSupport}
              paymentSupportSent={paymentSupportSent}
            />
          )}

        {order &&
          paymentMethodSelected &&
          ((paymentSuccess &&
            (paymentMethodSelected.value === "credit-card" ||
              paymentMethodSelected.value === "debit-card")) ||
            (paypalPaymentSuccess &&
              paymentMethodSelected.value === "paypal")) && (
            <PaymentSuccessModal isOpened={shouldOpenPaymentSuccessModal} />
          )}
      </Wrapper>

      <QRModal
        isOpened={qrModalOpened}
        onCloseModal={closeQRModal}
        amount={finalAmount}
      />

      <Toolbar />
    </>
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators(
      { createOrder, setOrderPaymentSupport, doPayment, getCoupon },
      dispatch
    ),
  };
}

function mapStateToProps(state, props) {
  const { stores } = state.ShoppingCart;
  const {
    order,
    creatingOrder,
    orderCreated,
    settingPaymentSupport,
    paymentSupportSent,
  } = state.Orders;
  const { deliveryLocation } = state.Location;
  const { payment, paymentSuccess, isDoingPayment } = state.Payments;
  const { coupon, loadingCoupon } = state.Coupons;
  const { rideRequest } = state.PiiddoGo;

  const [length, total, deliveryTotal] = getDataFromShoppingCart(
    stores,
    deliveryLocation
  );

  return {
    stores,
    order,
    creatingOrder,
    isCreatingOrder: creatingOrder,
    orderCreated,
    settingPaymentSupport,
    paymentSupportSent,
    payment,
    paymentSuccess,
    isDoingPayment,
    length,
    total,
    deliveryTotal,
    deliveryLocation,
    loadingCoupon,
    coupon,
    rideRequest,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
