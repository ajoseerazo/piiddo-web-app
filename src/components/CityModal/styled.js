import styled from "styled-components";
import { Modal, ModalBody, Button } from "reactstrap";

export const ModalStyled = styled(Modal)`
  width: 500px;
  min-width: 500px;
  max-width: 500px;

  .modal-content {
    border-radius: 10px;
    border: none;
    overflow: hidden;
    max-height: calc(100vh - 3.5rem);
    min-height: calc(100vh - 3.5rem);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0px;
    min-width: 100% !important;
    max-width: 100%;
    padding: 0px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .modal-content {
      max-height: 100%;
      margin: 0px;
      border-radius: 20px;
      min-height: 400px;
      max-height: 400px;
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    border-radius: 20px;
  }
`;

export const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const CityList = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;

  a {
    text-decoration: none;
    color: #555;
  }
`;

export const CityItem = styled.li`
  padding: 20px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    padding: 15px 20px;
  }
`;

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
