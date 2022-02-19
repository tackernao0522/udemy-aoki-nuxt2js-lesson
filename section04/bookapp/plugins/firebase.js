// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdJno4iBTLTvftl2OXa6mhvqa-X19YC5A",
  authDomain: "nuxt-spa-book-app-d5e90.firebaseapp.com",
  projectId: "nuxt-spa-book-app-d5e90",
  storageBucket: "nuxt-spa-book-app-d5e90.appspot.com",
  messagingSenderId: "99841662313",
  appId: "1:99841662313:web:06b655cec48b35dd8831f8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default (context, inject) => {
  inject('firebase', firebaseApp)
}
