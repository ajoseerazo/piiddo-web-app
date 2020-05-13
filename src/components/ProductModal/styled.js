import styled from "styled-components";
import { Modal, ModalBody } from "reactstrap"

export const ModalStyled = styled(Modal)`
  width: 900px;
  min-width: 900px;
  max-width: 900px;

  .modal-content {
    border-radius: 10px;
    /*box-shadow: 0 2px 20px 12px rgba(247, 67, 66, 0.43);*/
    border: none;
    overflow: hidden;
    max-height: calc(100vh - 3.50rem);
    min-height: calc(100vh - 3.50rem);
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  flex-direction: row;
  padding: 0px;
  overflow: hidden;
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
`;

export const ModalBodyRightStyled = styled.div`
  width: 50%;
  padding: 30px 50px 100px 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
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

export const ProductCustomSection = styled.div`
`;

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