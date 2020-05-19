import styled from "styled-components";
import { Modal, ModalBody } from "reactstrap";

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
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  padding: 0px;

  @media screen and (max-width: 768px) {
  }
`;
