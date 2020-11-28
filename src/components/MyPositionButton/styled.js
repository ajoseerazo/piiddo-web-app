import styled from "styled-components";

export const MyPositionButtonWrapper = styled(({ tiny, ...rest }) => (
  <div {...rest} />
))`
  font-size: 12px;
  background: #f7e5e5;
  padding: 0px 5px;
  border-radius: 16px;
  width: ${({ tiny }) => (tiny ? "50px" : "114px")};
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
