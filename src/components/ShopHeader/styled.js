import styled from "styled-components";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const BackButtonWrapper = styled.div`
  position: absolute;
  left: 0px;
  width: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const NavbarStyled = styled(Navbar)`
  background-color: #fff;
  borderbottom: ${({ bordered }) =>
    bordered ? "1px solid #e5edef" : undefined};

  input {
    border-right: 0px !important;
    border-color: #ebebeb !important;
    font-size: 14px !important;
  }

  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-group-text {
    background: #fafaf8;
    border-color: #ebebeb !important;

    &:hover {
      background: white;
      cursor: pointer;
      color: $primary-color;
    }

    &:focus {
      box-shadow: none !important;
    }
  }

  .nav-link {
    font-size: 12px;
    padding-top: 9px;
    padding-bottom: 9px;
  }

  .navbar-nav .nav-link {
    color: #f74342;
  }

  @media (max-width: 768px) {
    padding: 0px 15px !important;
    display: flex;
    align-items: center !important;
    border-bottom: none;
    height: 50px !important;
    padding-left: 0px;
    padding-right: 0px;

    .navbar-brand {
      margin: 0px 0px 0px 34px;

      img {
        width: 80px !important;
      }
    }

    > ul {
      position: absolute;
      top: 5px;
      right: 0px;
      flex-direction: row;
      width: calc(100% - 150px);
      justify-content: flex-end;
      max-width: 300px;

      li {
        margin-right: 0px !important;
      }
    }

    .cart-icon {
      position: absolute;
      top: 4px;
      z-index: 100;
      right: 14px;
    }

    .navbar-nav {
      flex-direction: row;
    }

    .search-input {
      display: none;
    }

    .search-button {
      display: none;
    }

    .hide-mobile {
      display: none;
    }

    li.address-selector-wrapper {
      max-width: calc(100% - 45px);

      &.mobile {
        display: none;
      }
    }
  }
`;

export const SigninLinkStyled = styled(NavLink)`
  background: #f74342;
  color: white !important;
  border-radius: 12px;
  padding-left: 15px !important;
  padding-right: 15px !important;
  font-size: 12px !important;
  margin-top: 2px;

  &:hover {
    box-shadow: 0 10px 10px -5px #f74342;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchWrapper = styled(Col)`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const DropdownToggleStyled = styled(DropdownToggle)`
  background: transparent;
  border: none;
  padding: 0px;

  &:hover,
  &:active,
  &:focus {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
`;

export const DropdownMenuStyled = styled(DropdownMenu)`
  top: 19px !important;
  left: 6px !important;
  border-radius: 0px !important;
  border: none;
  border-left: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  border-bottom-left-radius: 12px !important;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);

  button {
    &:active,
    &:hover {
      background: #f74342 !important;
      color: #fff !important;
    }
  }
`;

export const DropdownItemStyled = styled(DropdownItem)`
  font-size: 14px;
`;

export const UserNavItem = styled(NavItem)`
  @media (max-width: 768px) {
    display: none !important;
  }
`;
