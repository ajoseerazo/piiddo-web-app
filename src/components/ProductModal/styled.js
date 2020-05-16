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
  width: 900px;
  min-width: 900px;
  max-width: 900px;

  .modal-content {
    border-radius: 10px;
    /*box-shadow: 0 2px 20px 12px rgba(247, 67, 66, 0.43);*/
    border: none;
    overflow: hidden;
    max-height: calc(100vh - 3.5rem);
    min-height: calc(100vh - 3.5rem);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0px;
    border-radius: 0px;
    min-width: 100% !important;
    max-width: 100%;

    .modal-content {
      max-height: 100%;
      margin: 0px;
      border-radius: 0px;
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  flex-direction: row;
  padding: 0px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ModalBodyLeftStyled = styled.div`
  width: 50%;
  padding: 30px 20px 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    border-radius: 10px;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (max-width: 768px) {
    padding: 0px;
    width: 100%;

    img {
      border-radius: 0px;
      max-height: 250px;
    }
  }
`;

export const ModalBodyRightStyled = styled.div`
  width: 50%;
  padding: 30px 50px 100px 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
  }
`;

export const ProductTitleStyled = styled.div`
  font-size: 28px;
  margin-bottom: 30px;
`;

export const ProductDescriptionStyled = styled.div`
  font-size: 14px;
  color: #7d7d7d;
`;

export const ProductCustomSectionTitle = styled.div`
  color: #332927;
  margin: 25px 0 15px;
  border-bottom: 1px solid #cacaca;
  padding-bottom: 8px;
  font-weight: 600;
`;

export const ProductCustomSection = styled.div``;

export const ProductCustomSectionBody = styled.div`
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
`;

export const ProductCustomItemStyled = styled.li`
  color: #7d7d7d;
  font-size: 14px;
  line-height: 18px;
  padding: 10px 0px;
  border-bottom: 1px solid #e5edef;
`;
