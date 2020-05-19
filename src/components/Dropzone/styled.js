import styled from "styled-components";

export const DropzoneWrapper = styled.div`
  cursor: pointer;
  > section {
    padding: 15px;
    border-radius: 8px;
    border: 2px dashed #ccc;
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    overflow: hidden;
    margin-bottom: 50px;

    div  {
      outline: none;
    }
  }
`;
