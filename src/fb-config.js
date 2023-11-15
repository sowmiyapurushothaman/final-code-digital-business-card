import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC1dhDf9sMZgqpVrLqfr3CgVjzZ4eteVO4",
  authDomain: "fsabizcard.firebaseapp.com",
  projectId: "fsabizcard",
  storageBucket: "fsabizcard.appspot.com",
  messagingSenderId: "942464405333",
  appId: "1:942464405333:web:21e8b06c1229cee599e9dc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const databse = getDatabase(app);

export const colRef = collection(db, "cards");

export const storage = getStorage(app);