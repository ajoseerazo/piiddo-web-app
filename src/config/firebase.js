import firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyD53LSQgZaTGd7n_g5UxM1j3Gw_K4cpNAw",
  authDomain: "genial-core-212201.firebaseapp.com",
  databaseURL: "https://genial-core-212201.firebaseio.com",
  projectId: "genial-core-212201",
  storageBucket: "genial-core-212201.appspot.com",
  messagingSenderId: "981763353916",
  appId: "1:981763353916:web:7e2e2e626040c2bf2b8239",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export const storage = firebase.storage;

export default firebase;
