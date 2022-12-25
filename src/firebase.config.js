import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAodigpQyEq-18iOPQWdMSZgk9Eb29RCSE",
    authDomain: "restaurantapp-ae337.firebaseapp.com",
    databaseURL: "https://restaurantapp-ae337-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-ae337",
    storageBucket: "restaurantapp-ae337.appspot.com",
    messagingSenderId: "585521787986",
    appId: "1:585521787986:web:3bc5bcab685c21f7941b8b"
  };
  const app=getApps.length>0?getApp:initializeApp(firebaseConfig)
  const firestore=getFirestore(app)
  const storage=getStorage(app)
  export {app,firestore,storage}