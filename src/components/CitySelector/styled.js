import styled from "styled-components";

export const CitySelectorWrapper = styled.div`
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
  border-radius: 12px;
  height: 45px;
  padding: 0 20px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 15px;
    margin-right: 15px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
