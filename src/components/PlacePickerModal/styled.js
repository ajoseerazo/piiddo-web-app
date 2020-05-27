import styled from "styled-components";
import { Modal, ModalBody, Button } from "reactstrap";
import { CloseButton } from "../ProductModal/styled"

export const ModalStyled = styled(Modal)`
  min-width: 660px;
  max-width: 660px;
  position: relative;
  height: calc(100vh - 40px);
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    margin: 0px;
    min-height: 100vh;

    .modal-content {
      min-height: 100%;
      border-radius: 0px;
      border: none;
    }

    ${CloseButton} {
      top: 18px;
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  padding: 0px;

  .modal-content {
    border: none;
  }
`;

export const TitleStyled = styled.div`
  padding: 13px 100px 13px 30px;
  font-size: 18px;
  height: 82px;
  border-bottom: 1px solid #ddd;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 13px 50px 13px 15px;
    height: 72px;
  }
`;

export const MapNotification = styled.div`
  color: #fff;
  position: absolute;
  background: #458ee5;
  padding: 15px 40px;
  border-radius: 4px;
  z-index: 1;
  right: 130px;
  top: 100px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.19), 0 2px 4px rgba(0, 0, 0, 0.23);
  text-align: center;
  font-size: 12px;
  width: 400px;

  @media screen and (max-width: 768px) {
    width: 80%;
    left: 10%;
    padding: 10px 20px;
  }
`;

export const ModalFooter = styled.div`
  padding: 0px 20px 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    margin-top: 15px;
  }
`;

export const ButtonStyled = styled(Button)`
  background-color: #f74342;
  border: none;
  width: 255px;
  height: 50px;
  border-radius: 8px;

  &:hover,
  &:active,
  &:focus,
  &:visited {
    background-color: #f74342;
  }

  @media screen and (max-width: 768px) {
    border-radius: 0px;
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
`;

export const CurrentAddress = styled.div`
  padding: 15px 0 10px 0;
  border-bottom: 0.5px solid #ddd;
  width: 100%;

  span {
    margin-left: 10px;
    font-size: 14px;
  }
`;

export const MapElementStyled = styled.div`
  height: calc(100vh - 250px);

  @media screen and (max-width: 768px) {
    height: calc(100vh - 197px);
  }
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 55px;
  border: none;
  border-bottom: 0.5px solid #ddd;
  padding-right: 125px;

  &:focus {
    border: none;
    border-bottom: 0.5px solid #ddd;
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    height: 45px;
    font-size: 14px;
    border-bottom: none;

    &:focus {
      border-bottom: none;
    }
  }
`;

export const AutocompleteWrapper = styled.div`
  position: relative;

  .my-position-wrapper {
    position: absolute;
    right: 0px;
    top: 13px;
  }

  @media screen and (max-width: 768px) {
    .my-position-wrapper {
      top: 6px;
    }
  }
`;
