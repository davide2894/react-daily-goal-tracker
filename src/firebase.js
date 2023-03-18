// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWuRUVtL5iesMW5-6Ugqv7pmitY_f-aoU",
  authDomain: "react-daily-goal-tracker.firebaseapp.com",
  projectId: "react-daily-goal-tracker",
  storageBucket: "react-daily-goal-tracker.appspot.com",
  messagingSenderId: "127766768496",
  appId: "1:127766768496:web:6580c3395f8f939587fdb5",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const db = getFirestore();
const auth = firebase.auth();

provider.setCustomParameters({
  prompt: "select_account",
});

const registerWithEmailAndPassword = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // Add a new document in collection "cities"
      db.collection("users")
        .doc("user")
        .set({
          name: user,
          email: "test@test.test",
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })
    .catch((error) => {
      alert(error.message);
    });

const loginWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log({
        msg: "user logged in successfully",
        user: userCredential.user,
      });
    })
    .catch((error) => {
      alert({
        errorCode: error.code,
        errorMessage: error.message,
      });
    });

export {
  firebase,
  provider,
  db,
  auth,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
};
