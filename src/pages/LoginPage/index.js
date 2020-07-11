import { LoginPageWrapper } from "./styled";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const LoginPage = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <LoginPageWrapper>
      <h3>Inicia sesión</h3>

      <FacebookLogin
        appId="581544162797490"
        fields="name,email,picture"
        callback={responseFacebook}
      />

      <GoogleLogin
        clientId="981763353916-hosodgav8eh8rvcln8ifiju2jeo08r63.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </LoginPageWrapper>
  );
};

export default LoginPage;
