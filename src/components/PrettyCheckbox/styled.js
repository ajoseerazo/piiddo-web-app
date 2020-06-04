import styled from "styled-components";

export const CheckboxStyled = styled.div`
  width: 100%;

  label {
    width: 100%;
    display: flex !important;
    justify-content: space-between;
  }

  svg {
    position: absolute;
    font-size: 1em;
    width: calc(1em + 2px);
    height: calc(1em + 2px);
    left: 1px;
    z-index: 1;
    text-align: center;
    line-height: normal;
    top: calc((0% - (100% - 1em)) - 8%);
    border: 1px solid transparent;
    opacity: 1;
    animation: zoom 0.2s ease;
    color: #fff;
    stroke: #fff;
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
