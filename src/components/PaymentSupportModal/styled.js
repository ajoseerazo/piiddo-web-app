import styled from "styled-components";
import { Modal, ModalBody } from "reactstrap";

export const ModalStyled = styled(Modal)`
  min-height: calc(100vh - 40px);
  .modal-content {
    border: none;
  }

  @media screen and (max-width: 768px) {
    margin: 0px;
    min-height: 100vh;

    .modal-content {
      min-height: 100vh;
      border-radius: 0px;
    }
  }
`;

export const ModalBodyStyled = styled(ModalBody)`
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
`;
