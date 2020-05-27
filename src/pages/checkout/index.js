import { useState, useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ordersActions from "../../redux/actions/orders";
import actions from "../../redux/actions/shoppingCart";
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

const { createOrder, setOrderPaymentSupport } = ordersActions;
const { doPayment } = paymentsActions;

const CheckoutPage = ({
  items,
  address,
  actions: { createOrder, setOrderPaymentSupport, doPayment },
  isCreatingOrder,
  order,
  orderCreated,
  settingPaymentSupport,
  paymentSupportSent,
  isDoingPayment,
  paymentSuccess,
}) => {
  const [paymentMethodSelected, setPaymentMethodSelected] = useState();
  const [showPaymentMethods, setShowPaymentMethods] = useState(true);
  const [name, setName] = useState();
  const [extraAddress, setExtraAddress] = useState();
  const [number, setNumber] = useState();
  const [receiverName, setReceiverName] = useState();
  const [receiverNumber, setReceiverNumber] = useState();
  const [email, setEmail] = useState();
  const [vuelto, setVuelto] = useState(0);
  const [isSamePerson, setIsSamePerson] = useState(false);
  const [shouldOpenSupportModal, setShouldOpenSupportModal] = useState(false);
  const [creditCard, setCreditCard] = useState();
  const [
    shouldOpenPaymentSuccessModal,
    setShouldOpenPaymentSuccessModal,
  ] = useState(false);
  const [paypalPaymentSuccess, setPaypalPaymentSuccess] = useState(false);

  let total = (items || []).reduce((a, b) => {
    return a + b.totalAmount;
  }, 0);

  let totalDelivery = 1.4;

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

  const handleInputChange = useCallback(
    (key, { target: { value } }) => {
      const func = `set${key[0].toUpperCase()}${key.substr(1)}('${value}')`;

      eval(func);
    },
    [setName]
  );

  const confirmOrder = useCallback(async () => {
    const payload = {
      address: address || "",
      name,
      number,
      email,
      receiverName: isSamePerson ? name : receiverName,
      receiverNumber: isSamePerson ? number : receiverNumber,
      paymentMethodSelected,
      extraAddress,
      vuelto,
      items,
    };

    if (
      paymentMethodSelected.value === "credit-card" ||
      paymentMethodSelected.value === "debit-card"
    ) {
      const result = await doPayment({
        card: creditCard,
        bill: {
          firstName: name,
          lastName: name,
          address: address || extraAddress,
          email,
          documentType: "dni",
          documentNumber: number,
        },
        amount: total + totalDelivery,
      });

      console.log(result);

      if (result && result.success) {
        payload.paymentStatus = "COMPLETED";
        createOrder(payload);
      } else {
        alert("Ocurrió un error procesando el pago");
      }
    } else {
      createOrder(payload);
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
    items,
    createOrder,
    doPayment,
    total,
    totalDelivery,
    creditCard,
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
                total + totalDelivery,
                2
              )}&apiKey=${"960d52033f7a2e5b28d272b83be43aa4aee6646a570a909d6dc37972a0ea4cee"}&accountID=${`41513570`}&merchantID=${`90361928`}&invoice=${
                order.id
              }&callbackURL=${window.location.origin}/criptopayments/${
                order.id
              }`;

              /*window.open(
                *`https://payments.criptopagos.co?amount=${
                  total + totalDelivery
                }&apiKey=${"960d52033f7a2e5b28d272b83be43aa4aee6646a570a909d6dc37972a0ea4cee"}&accountID=${`41513570`}&merchantID=${`90361928`}&invoice=${
                  order.id
                }`*
                "http://localhost:3001/?amount=3.5&apiKey=960d52033f7a2e5b28d272b83be43aa4aee6646a570a909d6dc37972a0ea4cee&accountID=41513570&merchantID=90361928",
                "_blank",
                window.innerWidth > 768
                  ? `width=500,height=${window.innerHeight},left=${
                      window.innerWidth / 2 - 250
                    }`
                  : undefined
              );

              window.addEventListener("message", (e) => {
                if (e.origin === "https://localhost:3001") {
                  console.log(e.data);
                }
              });*/
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

      const payload = {
        address: address || "",
        name,
        number,
        email,
        receiverName: isSamePerson ? name : receiverName,
        receiverNumber: isSamePerson ? number : receiverNumber,
        paymentMethodSelected,
        extraAddress,
        vuelto,
        items,
        paymentStatus: "COMPLETED",
        paymentDetails: details,
      };

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
      items,
      createOrder,
      doPayment,
      total,
      totalDelivery,
      creditCard,
      setPaypalPaymentSuccess,
    ]
  );

  const onPayPalPaymentError = useCallback((error) => {
    console.log(error);
  });

  const isCheckoutButtonDisabled = useMemo(() => {
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
  ]);
  // console.log(order);
  // console.log(paypalPaymentSuccess);

  return (
    <>
      <Wrapper>
        <div>
          <CheckoutTitle>Confirmar orden</CheckoutTitle>

          <CheckoutContent>
            <CheckoutContentLeft>
              <CheckoutBox>
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
                    <span>Tiempo de entrega</span>
                    <span>40mins</span>
                  </CheckoutTimeContainer>
                </CheckoutAddress>
              </CheckoutBox>

              <CheckoutBox>
                <CheckoutBoxTitle>Tus datos</CheckoutBoxTitle>

                <CheckoutPersonalDataGroup>
                  <label>Nombre *</label>
                  <CheckoutInput
                    placeholder="Tu nombre"
                    onChange={handleInputChange.bind(this, "name")}
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
                    placeholder="Tu correo electrónico"
                    onChange={handleInputChange.bind(this, "email")}
                  />
                </CheckoutPersonalDataGroup>
              </CheckoutBox>

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
                        onChange={handleInputChange.bind(this, "receiverName")}
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
                          <CreditCardForm onChange={onChangeCreditCardData} />
                        )}
                      </>
                    </>
                  ) : null}
                </CheckoutPaymentMethod>
              </CheckoutBox>

              {/*<CheckoutBox>
              <CheckoutCoupon>Cupón</CheckoutCoupon>
            </CheckoutBox>*/}

              <CheckoutBox>
                <CheckoutProductsSummary>
                  <CheckoutBoxTitle>Tu orden</CheckoutBoxTitle>

                  {(items || []).map((item, index) => {
                    return (
                      <ShoppingBoxList
                        key={index}
                        order={item}
                        forceActive={true}
                        disableCounters
                      />
                    );
                  })}
                </CheckoutProductsSummary>
              </CheckoutBox>
            </CheckoutContentLeft>

            <CheckoutContentRight>
              <CheckoutBox>
                <CheckoutSummaryItem>
                  <CheckoutSummaryItemTitle>Productos</CheckoutSummaryItemTitle>
                  <CheckoutSummaryItemPrice>
                    ${parseFloat(total || 0).toFixed(2)}
                  </CheckoutSummaryItemPrice>
                </CheckoutSummaryItem>

                <CheckoutSummaryItem>
                  <CheckoutSummaryItemTitle>Delivery</CheckoutSummaryItemTitle>
                  <CheckoutSummaryItemPrice>
                    ${parseFloat(totalDelivery).toFixed(2)}
                  </CheckoutSummaryItemPrice>
                </CheckoutSummaryItem>

                <CheckoutTotal>
                  <div>
                    <CheckoutTotalTitle>Total</CheckoutTotalTitle>
                    <CheckoutTotalPrice>
                      ${parseFloat(total).toFixed(2)}
                    </CheckoutTotalPrice>
                  </div>

                  <div>
                    <CheckoutTotalTitle>Total Bs</CheckoutTotalTitle>
                    <CheckoutTotalPrice>
                      Bs {`${new Intl.NumberFormat("es").format(12 * 183000)}`}
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
                      amount={total + totalDelivery}
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
                      <span>Realizar pedido</span>
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
                paymentMethodSelected.value === "zelle" ? total : total * 183000
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

      <Toolbar />
    </>
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators(
      { createOrder, setOrderPaymentSupport, doPayment },
      dispatch
    ),
  };
}

function mapStateToProps(state, props) {
  const { items } = state.ShoppingCart;
  const {
    order,
    creatingOrder,
    orderCreated,
    settingPaymentSupport,
    paymentSupportSent,
  } = state.Orders;

  const { payment, paymentSuccess, isDoingPayment } = state.Payments;

  return {
    items,
    order,
    creatingOrder,
    isCreatingOrder: creatingOrder,
    orderCreated,
    settingPaymentSupport,
    paymentSupportSent,
    payment,
    paymentSuccess,
    isDoingPayment,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
