import styled from "styled-components";

export const SidebarWrapper = styled.div`
  background-color: white;
  font-family: "Poppins";
  padding: 15px 0px 15px 0;
  animation: height 1s ease-in-out;
  border-radius: 12px;
  overflow-y: hidden;
  height: 100%;
  background-color: #fff;
  width: 256px;
  border-radius: 12px;
  max-height: 600px;

  &.is-sticky {
    position: sticky;
    top: 90px;
    left: 40px;
    z-index: 10;
  }

  .category-name {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    padding: 0px 20px 10px;
  }

  ul {
    overflow-y: auto;
    height: 550px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    color: #7d7d7d;
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    &.no-title {
      //height: calc(100% - 70px);
    }

    li {
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      border-left: 2px solid white;

      &:hover,
      &.active {
        border-left: 2px solid #f74342;
      }
    }
  }
`;
