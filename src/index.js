import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {
  createFirebaseInstance,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

const reactReduxFireBaseConfig = {
  userProfile: "users",
  useFireStoreForProfile: true,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const reactReduxFirebaseProps = {
  firebase: firebase,
  config: reactReduxFireBaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance: createFirebaseInstance,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
