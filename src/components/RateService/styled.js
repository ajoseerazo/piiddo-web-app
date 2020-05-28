import styled from "styled-components";
import { Modal, ModalBody, Button } from "reactstrap";

export const ModalStyled = styled(Modal)`
  min-height: calc(100vh - 40px);

  .modal-content {
    border: none;
    border-radius: 16px;
  }

  @media screen and (max-width: 768px) {
    margin: 0px;
    min-height: 100vh;

    .modal-content {
      height: 100vh;
      border-radius: 0px;
      overflow-y: auto;
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
    object-position: center;
  }
`;

export const StarsWrapper = styled.div`
  margin: 10px 0px 20px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  background: #f7f7f7;
  border: none;
  border-radius: 8px;
  padding: 12px;

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

export const ButtonStyled = styled(Button)`
  background-color: #f74342;
  color: white;
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 190px;
  font-size: 14px;
  margin-top: 20px;

  &:hover {
    background-color: #f74342;
  }

  &:active,
  &:focus {
    background-color: #f74342 !important;
    border: none;
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const LinkButtonStyled = styled(Button)`
  background-color: transparent;
  border: none;
  color: #f74342;
  padding: 0px;
  text-align: left;
  margin-top: 20px;

  &:hover,
  &:active,
  &:focus {
    background-color: transparent !important;
    border: none !important;
    color: #222 !important;
    box-shadow: none !important;
  }

  span {
    margin-right: 5px;
  }
`;
