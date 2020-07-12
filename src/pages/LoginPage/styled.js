import styled from "styled-components";

export const LoginPageWrapper = styled.div`
  background-color: #fafaf8;
  margin-top: 70px;
  height: calc(100vh - 70px);
  justify-content: center;
  align-items: center;
  display: flex;

  button {
    margin-bottom: 20px;
  }

  h6 {
    color: #999;
    font-weight: 100;
  }

  @media screen and (max-width: 768px) {
    margin-top: 50px;
    height: calc(100vh - 50px);

    h3  {
      font-size: 25px;
    }
  }
`;

export const FacebookButton = styled.button`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  letter-spacing: 1px;
  margin: 12px 0;
  background-color: #1778f2;
  border-radius: 8px;
  font-family: Poppins-Regular, Helvetica, Arial, sans-serif;
  color: #fff;
  padding: 8.5px 14px;
  text-align: center;
  cursor: pointer;
  border: none;

  &:hover,
  &:active,
  &:focus {
    border: none;
    outline: none;
  }

  span {
    flex: 1;
  }
`;

export const GoogleButton = styled.button`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  letter-spacing: 1px;
  margin: 12px 0;
  background-color: #db4437;
  border-radius: 8px;
  font-family: Poppins-Regular, Helvetica, Arial, sans-serif;
  color: #fff;
  padding: 8.5px 14px;
  text-align: center;
  cursor: pointer;
  border: none;

  &:hover,
  &:active,
  &:focus {
    border: none;
    outline: none;
  }

  span {
    flex: 1;
  }
`;

export const LoginFormWrapper = styled.div`
  max-width: 500px;
  width: 500px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);

  @media screen and (max-width: 768px) {
    box-shadow: none;
    background: transparent;
    padding: 0px 40px;
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 20px;
`;
