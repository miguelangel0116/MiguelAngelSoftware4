import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
apiKey:import.meta.env.VITE_APIKEYYFB,
authDomain: "soft4-b9fc0.firebaseapp.com",
databaseURL: "https://soft4-b9fc0-default-rtdb.firebaseio.com",
projectId: "soft4-b9fc0",
storageBucket: "soft4-b9fc0.appspot.com",
messagingSenderId: "470637034099",
appId: "1:470637034099:web:f859011f3e6a92403b8806",
measurementId: "G-HYYFXEZXL0"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);