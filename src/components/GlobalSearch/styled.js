import styled from "styled-components";

export const GlobalSearchWrapper = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  background-color: rgb(247, 67, 66, 0.5);
  flex-direction: column;
  box-shadow: 0 32px 32px 0 rgba(51, 41, 39, 0.05);
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TitleSearch = styled.div`
  font-size: 63px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
`;
