import styled from "styled-components";

export const FooterWrapper = styled.div`
  height: 200px;
  padding: 50px;
  z-index: 100;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  border-top: 1px solid #f4f7f8;

  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;

    li {
      font-size: 14px;
      margin-bottom: 10px;
      color: rgb(84, 96, 104);

      a {
        color: rgb(84, 96, 104);
      }
    }
  }

  .col-md-4.center {
    display: flex;
    justify-content: center;
  }

  .v-center {
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 40px;
  }

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 20px 20px 80px 20px;

    .row {
      margin: 0px;
    }

    .logo {
      margin: 0px auto 20px;
    }

    ul {
      li {
        text-align: center;
      }
    }
  }
`;
