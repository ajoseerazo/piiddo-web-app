import styled from "styled-components";

export const SuccessWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 20px 30px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: rgb(42, 187, 155);
  color: white;

  div {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }

  g.svg-success {
    stroke: transparent;
  }

  path {
    stroke: #fff;
  }

  circle, path {
    fill: transparent;
  }

  button {
    margin-top: 20px;
  }

  .svg-success path {
    stroke-dasharray: 17px, 17px;
    stroke-dashoffset: 0px;
    -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
    animation: checkmark 0.25s ease-in-out 0.7s backwards;
  }
  
  .svg-success circle {
    stroke-dasharray: 76px, 76px;
    stroke-dashoffset: 0px;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    -webkit-animation: checkmark-circle 0.6s ease-in-out forwards;
    animation: checkmark-circle 0.6s ease-in-out forwards;
  }  

  @keyframes checkmark {
    0% {
      stroke-dashoffset: 17px;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes checkmark-circle {
    0% {
      stroke-dashoffset: 76px;
    }
    100% {
      stroke-dashoffset: 0px;
    }
`;

export const RedirectionDisclaimer = styled.div`
  font-size: 12px !important;
  margin-top: 50px;
`;
