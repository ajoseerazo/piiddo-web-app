import * as firebase from 'firebase'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyBCYN-bBQE2lEaZmk36ySxa2dSd6yeEgm4",
  authDomain: "veket-3eaee.firebaseapp.com",
  databaseURL: "https://veket-3eaee.firebaseio.com",
  projectId: "veket-3eaee",
  storageBucket: "veket-3eaee.appspot.com",
  messagingSenderId: "117314345909",
  appId: "1:117314345909:web:cc0a31412a2099a4f797fc"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const db = firebase.firestore();

export default firebase