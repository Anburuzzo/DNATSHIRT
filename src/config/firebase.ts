import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyAZTYQBsGi26bFMyKK7vx-flvrETLbFv_4",
  authDomain: "dnatshirt-dd769.firebaseapp.com",
  projectId: "dnatshirt-dd769",
  storageBucket: "dnatshirt-dd769.firebasestorage.app",
  messagingSenderId: "1054986002200",
  appId: "1:1054986002200:web:7b78b77d568c8bc393886d",
    measurementId: "G-V24CP93TS8"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(
    AsyncStorage
  ),
});

export default app;


