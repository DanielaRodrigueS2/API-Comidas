import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0pWvOIeRTnS6Tvu5Y75tSSCFerB5CaAs",
  authDomain: "api-comidas.firebaseapp.com",
  projectId: "api-comidas",
  storageBucket: "api-comidas.firebasestorage.app",
  messagingSenderId: "787034157067",
  appId: "1:787034157067:web:b1c60e5cf62632e67f970e",
  measurementId: "G-W2PNM4XM48"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);