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
import Payment from "@remepagos/pay-button";
import AxieSupportModal from "../../components/AxieSupportModal";
import PrettyRadioButton from "../../components/PrettyRadioButton";

const { createOrder, setOrderPaymentSupport } = ordersActions;
const { doPayment } = paymentsActions;
const { getCoupon } = couponsActions;

const REMEPAGOS_DISCOUNT = 0.1;

const DOLLAR_BASE = 5.34;
const DOLLAR_PRICE = DOLLAR_BASE + DOLLAR_BASE * 0;

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
  const [shouldOpenPaymentSuccessModal, setShouldOpenPaymentSuccessModal] =
    useState(false);
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
  const [typeOfCard, setTypeOfCard] = useState("tdd");

  const { type } = router.query;

  const { addToast } = useToasts();

  const itemsOrder = useMemo(() => {
    return Object.keys(stores)
      .map((storeId) => {
        return (stores[storeId].items || []).map((item) => {
          return {
            title: item.product.name,
            count: item.count,
            amount: item.totalAmount,
            image: item.product.image,
          };
        });
      })
      .flat();
  }, [stores]);

  let remepagosPaymentButton = null;

  const selectPaymentMethod = (paymentMethod) => {
    setPaymentMethodSelected(paymentMethod);
    setShowPaymentMethods(false);

    if (paymentMethod.value === "remepagos") {
      remepagosPaymentButton = new Payment({
        merchantId: process.env.NODE_ENV === "production" ? "154656" : "209581",
        items: [
          ...itemsOrder,
          {
            title: "Delivery",
            count: 1,
            amount: finalDelivery,
            image:
              "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/moto.png?alt=media&token=1514fc99-5eb8-45c9-b76e-a30469e19f59",
          },
          {
            title: "Descuento",
            count: 1,
            amount: finalAmount * 0.1 * -1,
            image:
              "https://lh3.googleusercontent.com/proxy/yoosM01ov1oz7HcDs6Xddper3L6rinkJDtqtBzdrLRKJCLE81Dh_9kM_DzcXXQvwowa4nk0X7L4nWAbKHCbTbK625ZLK-DMc",
          },
        ],
        amount: finalAmount * 0.9,
        onPaymentSuccess: onRemepagosPaymentSuccess,
      });
      remepagosPaymentButton.render("remepagos-button-container");
    } else {
      if (remepagosPaymentButton) {
        remepagosPaymentButton.remove();
      }
    }
  };

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
        alert("Debes ingresar tu direcci??n. Ingresala en la barra superior");
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
        amount: finalAmount * DOLLAR_PRICE,
        cardType: typeOfCard,
      });

      if (result && result.success) {
        payload.paymentStatus = "COMPLETED";
        createOrder(payload);
      } else {
        alert("Ocurri?? un error procesando el pago");
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
    typeOfCard,
  ]);

  useEffect(() => {
    if (orderCreated && paymentMethodSelected) {
      if (
        paymentMethodSelected.value === "pago-movil" ||
        paymentMethodSelected.value === "bank-transfer" ||
        paymentMethodSelected.value === "zelle" ||
        paymentMethodSelected.value === "slp"
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
              }&callbackURL=${window.location.origin}/criptopayments/${
                order.id
              }`;
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

  const onRemepagosPaymentSuccess = (paymentData) => {
    const payload =
      type !== "piiddo-go"
        ? {
            address: address || "",
            name,
            number,
            email,
            receiverName: isSamePerson ? name : receiverName,
            receiverNumber: isSamePerson ? number : receiverNumber,
            paymentMethodSelected: {
              name: "Remepagos",
              value: "remepagos",
            },
            extraAddress,
            vuelto,
            stores,
            paymentStatus: "COMPLETED",
            paymentDetails: paymentData,
          }
        : {
            name,
            number,
            email,
            paymentMethodSelected: {
              name: "Remepagos",
              value: "remepagos",
            },
            paymentStatus: "COMPLETED",
            paymentDetails: details,
            ...rideRequest,
            type,
            extraFromAddress,
            extraToAddress,
          };

    console.log(payload);

    if (coupon && couponApplied && !invalidCoupon) {
      payload.coupon = coupon.code;
    }

    createOrder(payload);
  };

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
            if (
              !creditCard ||
              !billAddress ||
              !billDNI ||
              !billName ||
              !billLastName
            ) {
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
    billAddress,
    billDNI,
    billName,
    billLastName,
  ]);

  const closeQRModal = useCallback(() => {
    setQrModalOpened(false);
  }, []);

  const verifyCoupon = useCallback(() => {
    getCoupon(couponCode);
  }, [couponCode]);

  useEffect(() => {
    if (coupon === "not-valid" && !loadingCoupon) {
      addToast(`Cup??n no v??lido`, {
        appearance: "error",
        autoDismiss: true,
      });
      setInvalidCoupon(true);
    } else {
      if (coupon && coupon.id && !loadingCoupon) {
        if (!coupon.isPersonal) {
          if (coupon.maxLimit) {
            if (finalAmount <= coupon.maxLimit) {
              addToast(`Cup??n aplicado exitosamente`, {
                appearance: "success",
                autoDismiss: true,
              });
              setInvalidCoupon(false);
            } else {
              addToast(
                `El valor del pedido supera el monto m??ximo del cup??n que son ${coupon.maxLimit}$`,
                {
                  appearance: "error",
                  autoDismiss: true,
                }
              );
              setInvalidCoupon(true);
            }
          } else {
            addToast(`Cup??n aplicado exitosamente`, {
              appearance: "success",
              autoDismiss: true,
            });
            setInvalidCoupon(false);
          }
        } else {
          if (coupon.uid === user.uid) {
            if (coupon.maxLimit) {
              if (finalAmount <= coupon.maxLimit) {
                addToast(`Cup??n aplicado exitosamente`, {
                  appearance: "success",
                  autoDismiss: true,
                });
                setInvalidCoupon(false);
              } else {
                addToast(
                  `El valor del pedido supera el monto m??ximo del cup??n que son ${coupon.maxLimit}$`,
                  {
                    appearance: "error",
                    autoDismiss: true,
                  }
                );
                setInvalidCoupon(true);
              }
            } else {
              addToast(`Cup??n aplicado exitosamente`, {
                appearance: "success",
                autoDismiss: true,
              });
              setInvalidCoupon(false);
            }
          } else {
            addToast(`Cup??n no v??lido para este usuario`, {
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

  useEffect(() => {
    const total = finalTotal + finalDelivery;

    if (paymentMethodSelected && paymentMethodSelected.value === "remepagos") {
      setFinalAmount(total - total * REMEPAGOS_DISCOUNT);
    } else {
      setFinalAmount(total);
    }
  }, [paymentMethodSelected]);

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

  const onCloseModalAxie = useCallback(() => {
    setShouldOpenSupportModal(false);
  });

  const onSelectOptionTypeOfCard = useCallback((type) => {
    setTypeOfCard(type);
  }, []);

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
                      <CheckoutBoxTitle>Direcci??n</CheckoutBoxTitle>
                      <CheckoutAddressText>{address}</CheckoutAddressText>
                    </div>

                    <CheckoutPersonalDataGroup>
                      <label>??C??mo llegar? *</label>
                      <CheckoutInput
                        placeholder="Escribe la direcci??n exacta, puntos de referencias, etc"
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
                      <label>??C??mo llegar al punto de partida?</label>
                      <CheckoutInput
                        placeholder="Escribe la direcci??n exacta, puntos de referencias, etc"
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
                      <label>??C??mo llegar al destino?</label>
                      <CheckoutInput
                        placeholder="Escribe la direcci??n exacta, puntos de referencias, etc"
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
                  <label>N??mero de tel??fono *</label>
                  <CheckoutInput
                    placeholder="Tu n??mero de tel??fono"
                    onChange={handleInputChange.bind(this, "number")}
                  />
                </CheckoutPersonalDataGroup>

                <CheckoutPersonalDataGroup>
                  <label>Correo *</label>
                  <CheckoutInput
                    defaultValue={user ? user.email : undefined}
                    placeholder="Tu correo electr??nico"
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
                        <label>N??mero de tel??fono *</label>
                        <CheckoutInput
                          placeholder="N??mero de tel??fono de la persona que recibe"
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
                <CheckoutBoxTitle>Cup??n de descuento</CheckoutBoxTitle>

                <CheckoutPersonalDataGroup>
                  <CouponForm>
                    <label>Cup??n</label>

                    {!couponApplied || invalidCoupon ? (
                      <>
                        <CheckoutInput
                          placeholder="Ingresa un cup??n"
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
                  <CheckoutBoxTitle>M??todo de pago</CheckoutBoxTitle>

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
                              {paymentMethodSelected.image && (
                                <img src={paymentMethodSelected.image} />
                              )}
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
                                Datos de facturaci??n de la tarjeta
                              </CheckoutBoxTitle>

                              <CheckoutPersonalDataGroup>
                                <label>Tipo de tarjeta *</label>
                                <>
                                  <div
                                    style={{
                                      paddingTop: 10,
                                      paddingBottom: 10,
                                    }}
                                  >
                                    <PrettyRadioButton
                                      label={"Tarjeta de D??bito"}
                                      onChange={onSelectOptionTypeOfCard.bind(
                                        this,
                                        "tdd"
                                      )}
                                      checked={typeOfCard === "tdd"}
                                    />
                                  </div>

                                  <div style={{ paddingBottom: 10 }}>
                                    <PrettyRadioButton
                                      label={"Tarjeta de Cr??dito"}
                                      onChange={onSelectOptionTypeOfCard.bind(
                                        this,
                                        "tdc"
                                      )}
                                      checked={typeOfCard === "tdc"}
                                    />
                                  </div>
                                </>
                              </CheckoutPersonalDataGroup>

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
                                <label>N??mero de documento *</label>
                                <CheckoutInput
                                  placeholder="Numero de documento"
                                  onChange={handleInputChange.bind(
                                    this,
                                    "billDNI"
                                  )}
                                />
                              </CheckoutPersonalDataGroup>

                              <CheckoutPersonalDataGroup>
                                <label>Direcci??n *</label>
                                <CheckoutInput
                                  placeholder="Direcci??n de facturaci??n"
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
              <CheckoutCoupon>Cup??n</CheckoutCoupon>
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
                        parseFloat(
                          parseFloat(finalAmount * DOLLAR_PRICE).toFixed(2)
                        )
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
                      amount={parseFloat(`${finalAmount * 1.1}`).toFixed(2)}
                      shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      onSuccess={onPaypalPaymentSuccess}
                      options={{
                        clientId:
                          "AVrBWgvqybeqh7m5jzwLfLF6pHFP4JhSUZNkLwQCSapEPahVQWwoNIwD92HICSAO83BDg-u-zuFADVia",
                      }}
                      onError={onPayPalPaymentError}
                    />
                  </PaypalButtonWrapper>
                ) : !isDoingPayment &&
                  !paypalPaymentSuccess &&
                  paymentMethodSelected &&
                  paymentMethodSelected.value === "remepagos" ? null : (
                  <>
                    <CheckoutButton
                      onClick={confirmOrder}
                      disabled={
                        isCreatingOrder ||
                        isCheckoutButtonDisabled ||
                        orderCreated
                      }
                    >
                      {(isCreatingOrder || isDoingPayment) && (
                        <LoadingSpinner />
                      )}
                      {!isCreatingOrder && !isDoingPayment && (
                        <span>
                          {type !== "piiddo-go"
                            ? "Realizar pedido"
                            : "Confirmar viaje"}
                        </span>
                      )}
                    </CheckoutButton>{" "}
                  </>
                )}

                <div id="remepagos-button-container"></div>
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
          paymentMethodSelected.value === "slp" && (
            <AxieSupportModal
              isOpened={shouldOpenSupportModal}
              type={paymentMethodSelected.value}
              amount={finalAmount}
              orderId={order.id}
              onFinishPayment={onFinishPayment}
              isLoading={settingPaymentSupport}
              paymentSupportSent={paymentSupportSent}
              onRequestClose={onCloseModalAxie}
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
