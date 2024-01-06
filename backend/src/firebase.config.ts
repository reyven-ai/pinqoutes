import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCcCYdzoD62BU9YDArWCUbcPGuZGqWj8QA",
  authDomain: "pintech-uploading-files.firebaseapp.com",
  projectId: "pintech-uploading-files",
  storageBucket: "pintech-uploading-files.appspot.com",
  messagingSenderId: "729378984581",
  appId: "1:729378984581:web:30e13638df5372aca60fec",
  measurementId: "G-G6CDHEWK9S",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
