import styled from "styled-components";

export const PaymentMethodsWrapper = styled.ul`
  padding: 0px;
  list-style: none;
  margin-top: 20px;

  li {
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: "";
      background-image: linear-gradient(
        to right,
        rgba(247, 247, 247, 0.1),
        rgba(247, 247, 247, 0.5),
        #f7f7f7,
        #f7f7f7,
        #f7f7f7,
        rgba(247, 247, 247, 0.5),
        rgba(247, 247, 247, 0.1)
      );
      height: 5px;
      width: calc(100% - 20px);
      position: absolute;
      top: 50px;
      right: 10px;
    }
  }
`;
