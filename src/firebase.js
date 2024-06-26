import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc ,getDoc,deleteDoc,doc} from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxBT8AA4MbE0TRsmE8J5pVcLMsJ-yhXG8",
  authDomain: "ivanprojo-72b52.firebaseapp.com",
  projectId: "ivanprojo-72b52",
  storageBucket: "ivanprojo-72b52.appspot.com",
  messagingSenderId: "789774573710",
  appId: "1:789774573710:web:245a0c862a163432b1e9df"
};

export const app = initializeApp(firebaseConfig);
export const  auth =getAuth(app);
export const db =getFirestore(app);
export const provider = new GoogleAuthProvider( );
export { collection, addDoc,getDoc,deleteDoc,doc };