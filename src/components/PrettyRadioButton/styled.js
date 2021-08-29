import styled from "styled-components";

export const CheckboxStyled = styled.div`
  width: 100%;

  label {
    width: 100%;
    display: flex !important;
    justify-content: space-between;
    font-size: 14px;
  }

  img {
    height: 50px;
    object-fit: contain;
    object-position: center;
    margin-left: 10px;
    position: absolute;
    top: -16px;
  }

  input:checked ~ .state.p-danger label:after {
    background-color: #f74342 !important;
  }

  .state label:before {
    border-color: #e5edef !important;
    border-width: 2px;
  }

  .state label {
    padding-left: 5px;
  }

  i {
    left: 0.5px;
  }

  .pretty label {
    display: flex;
    justify-content: space-between;
  }
`;
