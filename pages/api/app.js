import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

// import firebaseConfig from "../config/firebaseconfig";
import firebaseConfig from "../../config/firebaseconfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
