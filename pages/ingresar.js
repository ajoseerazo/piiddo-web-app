import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import LoginPage from "../src/pages/LoginPage";

const Ingresar = () => {
  return (
    <>
      <ShopHeader
        hideLoginButton
        hideShoppingCart
        hideAddressSelector
        hideSarchBar
      />

      <LoginPage />
    </>
  );
};

export default Ingresar;
