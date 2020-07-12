import { useEffect } from "react";
import {
  LoginPageWrapper,
  FacebookButton,
  GoogleButton,
  LoginFormWrapper,
  TitleWrapper,
} from "./styled";
import firebase from "firebase";
import useUser from "../../hooks/useUser";
import useCity from "../../hooks/useCity";
import { useRouter } from "next/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ProductCustomItemStyled } from "../../components/ProductModal/styled";

library.add([faFacebook, faGoogle]);

const LoginPage = () => {
  const user = useUser();
  const router = useRouter();
  const city = useCity();

  useEffect(() => {
    if (user !== undefined) {
      if (user && city) {
        router.push(`/${city}`);
      }
    }
  }, [user, ProductCustomItemStyled]);

  console.log(user);

  const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <LoginPageWrapper>
      <LoginFormWrapper>
        <TitleWrapper>
          <h3>Inicia sesión</h3>
          <h6>Para continuar comprando</h6>
        </TitleWrapper>

        <FacebookButton onClick={loginWithFacebook}>
          <FontAwesomeIcon icon={["fab", "facebook"]} color="#fff" size="2x" />
          <span>Ingresar con Facebook</span>
        </FacebookButton>

        <GoogleButton onClick={loginWithGoogle}>
          <FontAwesomeIcon icon={["fab", "google"]} color="#fff" size="2x" />
          <span>Ingresar con Google</span>
        </GoogleButton>
      </LoginFormWrapper>
    </LoginPageWrapper>
  );
};

export default LoginPage;
