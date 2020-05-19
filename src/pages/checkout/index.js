import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ordersActions from "../../redux/actions/orders";
import actions from "../../redux/actions/shoppingCart";
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
} from "./styled";
import PrettyCheckbox from "../../components/PrettyCheckbox";
import PaymentMethods from "../../components/PaymentMethods";
import ShoppingBoxList from "../../components/ShoppingBoxList";
import LoadingSpinner from "../../components/LoadingSpinner";
import PaymentSupportModal from "../../components/PaymentSupportModal";

const { createOrder, setOrderPaymentSupport } = ordersActions;

const CheckoutPage = ({
  items,
  address,
  actions: { createOrder, setOrderPaymentSupport },
  isCreatingOrder,
  order,
  orderCreated,
  settingPaymentSupport,
  paymentSupportSent,
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

  let total = (items || []).reduce((a, b) => {
    return a + b.totalAmount;
  }, 0);

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

  const confirmOrder = useCallback(() => {
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

    createOrder(payload);
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
  ]);

  useEffect(() => {
    if (
      orderCreated &&
      paymentMethodSelected &&
      (paymentMethodSelected.value === "pago-movil" ||
        paymentMethodSelected.value === "bank-transfer" ||
        paymentMethodSelected.value === "zelle")
    ) {
      setShouldOpenSupportModal(true);
    }
  }, [orderCreated, paymentMethodSelected]);

  const onFinishPayment = useCallback(
    ({ supportUrl }) => {
      setOrderPaymentSupport(order.id, supportUrl);
    },
    [order]
  );

  useEffect(() => {
    if (
      orderCreated &&
      paymentMethodSelected &&
      (paymentMethodSelected.value === "pago-movil" ||
        paymentMethodSelected.value === "bank-transfer" ||
        paymentMethodSelected.value === "zelle")
    ) {
      if (paymentSupportSent) {
        alert("Payment Sent");
      }
    }
  }, [paymentSupportSent]);

  return (
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
                  <label>Dirección exacta</label>
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
                <label>Nombre</label>
                <CheckoutInput
                  placeholder="Tu nombre"
                  onChange={handleInputChange.bind(this, "name")}
                />
              </CheckoutPersonalDataGroup>

              <CheckoutPersonalDataGroup>
                <label>Número de teléfono</label>
                <CheckoutInput
                  placeholder="Tu número de teléfono"
                  onChange={handleInputChange.bind(this, "number")}
                />
              </CheckoutPersonalDataGroup>

              <CheckoutPersonalDataGroup>
                <label>Correo</label>
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
                    <label>Nombre</label>
                    <CheckoutInput
                      placeholder="Nombre de la persona que recibe"
                      onChange={handleInputChange.bind(this, "receiverName")}
                    />
                  </CheckoutPersonalDataGroup>

                  <CheckoutPersonalDataGroup>
                    <label>Número de teléfono</label>
                    <CheckoutInput
                      placeholder="Número de teléfono de la persona que recibe"
                      onChange={handleInputChange.bind(this, "receiverNumber")}
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
                          />
                        </CashAmount>
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
                <CheckoutSummaryItemPrice>$2.00</CheckoutSummaryItemPrice>
              </CheckoutSummaryItem>

              <CheckoutTotal>
                <div>
                  <CheckoutTotalTitle>Total</CheckoutTotalTitle>
                  <CheckoutTotalPrice>$12.00</CheckoutTotalPrice>
                </div>

                <div>
                  <CheckoutTotalTitle>Total Bs</CheckoutTotalTitle>
                  <CheckoutTotalPrice>
                    Bs {`${new Intl.NumberFormat("es").format(12 * 183000)}`}
                  </CheckoutTotalPrice>
                </div>
              </CheckoutTotal>

              <CheckoutButton onClick={confirmOrder} disabled={isCreatingOrder}>
                {isCreatingOrder && <LoadingSpinner />}
                {!isCreatingOrder && <spin>Realizar pedido</spin>}
              </CheckoutButton>
            </CheckoutBox>
          </CheckoutContentRight>
        </CheckoutContent>
      </div>

      {order && paymentMethodSelected &&
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
    </Wrapper>
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators(
      { createOrder, setOrderPaymentSupport },
      dispatch
    ),
  };
}

function mapStateToProps(state, props) {
  const { items } = state.ShoppingCart.toJS();
  const {
    order,
    creatingOrder,
    orderCreated,
    settingPaymentSupport,
    paymentSupportSent,
  } = state.Orders.toJS();

  return {
    items,
    order,
    creatingOrder,
    isCreatingOrder: creatingOrder,
    orderCreated,
    settingPaymentSupport,
    paymentSupportSent,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
