import styled, { css } from "styled-components";

export const AmountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const AmountStyled = styled(({ size, ...rest }) => <div {...rest} />)`
  font-weight: 600;

  ${({ size }) =>
    size === "small"
      ? css`
          font-size: 20px;
          color: #459af1;
        `
      : css`
          font-size: 40px;
        `}

  @media screen and (max-width: 768px) {
    ${({ size }) =>
      size === "small"
        ? css`
            font-size: 18px;
          `
        : css`
            font-size: 35px;
          `}
  }
`;

export const CurrencyStyled = styled(({ size, ...rest }) => <div {...rest} />)`
  margin-left: 10px;
  font-weight: 600;

  ${({ size }) =>
    size === "small"
      ? css`
          font-size: 20px;
          color: #459af1;
        `
      : css`
          font-size: 40px;
        `}

    @media screen and (max-width: 768px) {
      ${({ size }) =>
        size === "small"
          ? css`
              font-size: 18px;
            `
          : css`
              font-size: 35px;
            `}
`;
