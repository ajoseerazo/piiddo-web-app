import { useEffect, useState } from "react";
import firebase from "firebase";

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

export default useUser;
