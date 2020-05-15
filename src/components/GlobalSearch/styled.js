import styled from "styled-components";

export const GlobalSearchWrapper = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 22px 22px;
  background-color: #F74342;
  flex-direction: column;

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
