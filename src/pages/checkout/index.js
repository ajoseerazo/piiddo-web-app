import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
} from "./styled";
import PaymentMethods from "../../components/PaymentMethods";
import ShoppingBoxList from "../../components/ShoppingBoxList";

const CheckoutPage = ({ items, address }) => {
  let total = (items || []).reduce((a, b) => {
    return a + b.totalAmount;
  }, 0);

  console.log(address);

  return (
    <Wrapper>
      <div>
        <CheckoutTitle>Confirmar orden</CheckoutTitle>

        <CheckoutContent>
          <CheckoutContentLeft>
            <CheckoutBox>
              <CheckoutAddress>
                <CheckoutBoxTitle>Dirección</CheckoutBoxTitle>
                <CheckoutAddressText>{address}</CheckoutAddressText>

                <CheckoutTimeContainer>
                  <span>Tiempo de entrega</span>
                  <span>40mins</span>
                </CheckoutTimeContainer>
              </CheckoutAddress>
            </CheckoutBox>

            <CheckoutBox>
              <CheckoutPaymentMethod>
                <CheckoutBoxTitle>Método de pago</CheckoutBoxTitle>

                <PaymentMethods />
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
                <CheckoutTotalTitle>Total</CheckoutTotalTitle>
                <CheckoutTotalPrice>$12.00</CheckoutTotalPrice>
              </CheckoutTotal>

              <CheckoutButton>Realizar pedido</CheckoutButton>
            </CheckoutBox>
          </CheckoutContentRight>
        </CheckoutContent>
      </div>
    </Wrapper>
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

function mapStateToProps(state, props) {
  const { items } = state.ShoppingCart.toJS();

  return {
    items,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
