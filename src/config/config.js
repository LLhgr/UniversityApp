import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBBiDEBOzZwiqwKR7rXi1uGkCadikC9YPM",
    authDomain: "ac2mobile-a2483.firebaseapp.com",
    projectId: "ac2mobile-a2483",
    storageBucket: "ac2mobile-a2483.appspot.com",
    messagingSenderId: "524984806303",
    appId: "1:524984806303:web:07c8e1ea58891eaddf6baa"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore();

export default database