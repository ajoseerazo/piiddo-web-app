import styled from "styled-components";

export const Wrapper = styled.ul`
  list-style: none;
    padding: 0px 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    overflow: auto;
    width: 100%;
    margin: 0px;
    background-color: white;
    height: 50px;
  
    li {
      font-size: 13px;
      padding: 5px 8px;
      margin: 0 2px;
      font-family: 'Poppins', sans-serif;
  
      a {
        white-space: nowrap;
        color: black;
        text-decoration: none;
      }
  
      &:focus {
        text-decoration: none;
      }

      &.selected {
        background: #F74342;
        border-radius: 8px;
  
        a {
          color: #FFF;
        }
      }
    }
  }
  
  @media screen and (min-width: 769px) {
    ul.mobile-categories {
      display: none !important;
    }
  }
`;
