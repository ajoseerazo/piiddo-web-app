import styled from "styled-components";

export const AddressSelectorWrapper = styled.div`
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
  border-radius: 12px;
  height: 45px;
  padding: 0 20px;
  width: 230px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    flex: 1;
    font-size: 12px;
    height: 35px;
    margin-right: 0px;
    padding: 0 10px;
    margin-right: 8px;
    width: 100%;

    span {
      font-size: 12px;
    }
  }
`;

export const ChevronIconWrapper = styled.div``;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
`;
