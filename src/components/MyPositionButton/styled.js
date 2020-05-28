import styled from "styled-components";

export const MyPositionButtonWrapper = styled.div`
  font-size: 12px;
  background: rgba(247, 67, 66, 0.1);
  padding: 0px 5px;
  border-radius: 16px;
  width: 114px;
  color: #f74342;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    width: 95px;
  }
`;
