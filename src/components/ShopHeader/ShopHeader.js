import React, { useEffect, useState, Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Col,
  Dropdown,
} from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import appActions from "../../redux/actions/app";
import DynamicLink from "../DynamicLink";
import AddressSelector from "../../containers/AddressSelector";
import CitySelector from "../../components/CitySelector";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  BackButtonWrapper,
  NavbarStyled,
  SigninLinkStyled,
  SearchWrapper,
  DropdownToggleStyled,
  DropdownMenuStyled,
  DropdownItemStyled,
  UserNavItem,
} from "./styled";
import Router from "next/router";
import HeaderSearchBox from "../HeaderSearchBox";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { isMobile } from "react-device-detect";

const { logout } = appActions;

library.add([faShoppingBasket, faChevronLeft, faBars]);

import ShoppingCart from "../../containers/ShoppingCartContainer";

const ShopHeader = ({
  hideShoppingCart,
  address,
  bordered,
  hideBackButton,
  onClickAddressSelector,
  disableAddress,
  city,
  hideCitySelector,
  hideLoginButton,
  hideAddressSelector,
  hideSarchBar,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsBrowser(true);
    }
  }, []);

  const dispatch = useDispatch();

  const user = useUser();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const goBack = () => {
    Router.back();
  };

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <NavbarStyled light expand="md" fixed="top" bordered={bordered}>
      {!hideBackButton ? (
        <BackButtonWrapper onClick={goBack}>
          <FontAwesomeIcon icon={"chevron-left"} color="#f74342" />
        </BackButtonWrapper>
      ) : (
        <BackButtonWrapper>
          {!user ? (
            <Link href="/ingresar" as="/ingresar">
              <a>
                <Avatar />
              </a>
            </Link>
          ) : (
            <Avatar src={(user || {}).photoURL} />
          )}
        </BackButtonWrapper>
      )}

      <DynamicLink href={""} as={""}>
        <a>
          <NavbarBrand style={{ fontWeight: 300, color: "#FFF" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/piddo-color.png?alt=media&token=22e13946-57a0-490d-8b2b-42282273e88a"
              style={{
                width: 104,
              }}
              alt="Piiddo-Logo"
            />
          </NavbarBrand>
        </a>
      </DynamicLink>

      {!hideSarchBar && (
        <SearchWrapper md="5">
          <HeaderSearchBox />
        </SearchWrapper>
      )}

      <Nav className="ml-auto" navbar>
        <NavItem className="address-selector-wrapper mobile">
          {isBrowser && !isMobile && (
            <Suspense fallback={<div></div>}>
              <CitySelector city={city} disabled={hideCitySelector} />
            </Suspense>
          )}
        </NavItem>

        {!hideAddressSelector && (
          <NavItem className="address-selector-wrapper">
            <AddressSelector address={address} disabled={disableAddress} />
          </NavItem>
        )}

        <NavItem style={{ marginRight: 15 }}>
          {!hideShoppingCart && <ShoppingCart />}
        </NavItem>

        {!hideLoginButton && user === null && (
          <NavItem style={{ marginRight: 10 }}>
            <SigninLinkStyled href="/ingresar">Ingresar</SigninLinkStyled>
          </NavItem>
        )}

        {!!user && (
          <UserNavItem style={{ marginRight: 10 }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggleStyled>
                <Avatar src={user.photoURL} />
              </DropdownToggleStyled>
              <DropdownMenuStyled>
                <DropdownItemStyled header>Cuenta</DropdownItemStyled>
                <DropdownItemStyled onClick={doLogout}>
                  Salir de mi cuenta
                </DropdownItemStyled>
              </DropdownMenuStyled>
            </Dropdown>
          </UserNavItem>
        )}
      </Nav>
    </NavbarStyled>
  );
};

export default ShopHeader;
