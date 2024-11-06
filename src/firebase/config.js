import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6xA_Y1Umwf7pdkfF84f2Fm8RIthDBKfI",
  authDomain: "anor-auto.firebaseapp.com",
  projectId: "anor-auto",
  storageBucket: "anor-auto.appspot.com",
  messagingSenderId: "421783311807",
  appId: "1:421783311807:web:99399de17124e46f90bd0a"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);