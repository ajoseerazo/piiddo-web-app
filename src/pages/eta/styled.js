import styled from "styled-components";

const getStateColor = (state) => {
  switch (state) {
    case "confirming-payment":
      return "#F3DDB3";
    case "order-confirmed":
    case "confirming-order-with-partner":
      return "#9DABDD";
    case "order-taken":
    case "rider-at-partner":
      return "rgba(247, 67, 66, 0.1)";
    case "order-completed":
      return "#ADDDCE";
    default:
      return "white";
  }
};

export const EtaWrapper = styled.div`
  margin-top: 70px;

  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const MapWrapperStyled = styled.div`
  height: calc(100vh - 70px);

  @media screen and (max-width: 768px) {
    height: calc(100vh - 50px);
  }
`;

export const NotificationsWrapper = styled.div`
  background-color: white;
  position: fixed;
  bottom: 15px;
  left: 15px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
  width: 400px;
  height: 150px;
  font-size: 14px;

  > div {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    bottom: auto;
    width: calc(100% - 12px);
    left: 6px;
    top: 56px;
    padding: 15px 10px;
    height: 130px;
  }
`;

export const ETAIcon = styled.div`
  width: 80px;
  height: 80px;
  color: #333;
  border-radius: 50%;
  background: ${({ state }) => getStateColor(state)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  float: left;

  img  {
    height: 60%;
    width: 60%;
    object-fit: contain;
    object-position: center;
  }
`;

export const Time = styled.div`
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 8px;
  font-size: 16px;
`;

export const TimeUnit = styled.div``;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  position: relative;
  height: 100%;
  flex: 1;
`;

export const ProgressSteps = styled.div`
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

export const StateText = styled.div`
  font-size: 12px;
  color: #777;
`;

export const Step = styled.div`
  height: 8px;
  background: ${({ color }) => color};
  flex: 1;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:first-of-type {
    ${Step} {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
`;

export const CheckIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ color }) => color};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
