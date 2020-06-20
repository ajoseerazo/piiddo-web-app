import styled from "styled-components";
import { Modal, ModalBody, Button } from "reactstrap";

export const CloseButton = styled(Button)`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: #f74342;
  background: white;
  border: none;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover,
  &:visited,
  &:active,
  &:focus {
    background-color: white;
    color: #f74342;
  }
`;

export const ModalStyled = styled(Modal)`
  width: 500px;
  min-width: 500px;
  max-width: 500px;

  .modal-content {
    border-radius: 10px;
    border: none;
    overflow: hidden;
    min-height: 500px;
    border: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0px;
    border-radius: 0px;
    min-width: 100% !important;
    max-width: 100%;
    height: 100%;

    .modal-content {
      margin: 0px;
      border-radius: 0px;
      height: 100%;
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  background: #6843e3;
  padding: 20px 30px 30px 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const QrWrapper = styled.div`
  padding: 40px;
  border-radius: 10px;
  background: white;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

export const PStyled = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-top: 15;
    margin-bottom: 15px;
  }
`;

export const LogoRemepagos = styled.img`
  width: 150px;
  object-fit: cover;
  object-position: center;

  @media screen and (max-width: 768px) {
    width: 120px;
  }
`;

export const ButtonStyled = styled(Button)`
  background: white;
  color: #6843e3;
  border: none;
  height: 50px;

  &:hover,
  &:active,
  &:focus {
    background: white;
    color: #6843e3;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    bottom: 5px;
    width: calc(100% - 10px);
    left: 5px;
  }
`;
