import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCCsPOS85AM1df-ycP_DMIuDzC2oZB6lmw",
  authDomain: "react-chat-25d5a.firebaseapp.com",
  projectId: "react-chat-25d5a",
  storageBucket: "react-chat-25d5a.appspot.com",
  messagingSenderId: "733503340507",
  appId: "1:733503340507:web:a4dea83ec3a323fb0f71fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
