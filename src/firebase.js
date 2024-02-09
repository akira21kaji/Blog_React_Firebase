import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACoBnLDCn2k4SVcZIe0bN3Axsjz1HgFuI",
  authDomain: "blog-cb901.firebaseapp.com",
  projectId: "blog-cb901",
  storageBucket: "blog-cb901.appspot.com",
  messagingSenderId: "390931184560",
  appId: "1:390931184560:web:1b106848d816fb02103475",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
