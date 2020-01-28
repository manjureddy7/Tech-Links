import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBEgAdrwXZC9DJrVELaa0uLJgMTX7rRT5c",
  authDomain: "mj-tech-link.firebaseapp.com",
  databaseURL: "https://mj-tech-link.firebaseio.com",
  projectId: "mj-tech-link",
  storageBucket: "mj-tech-link.appspot.com",
  messagingSenderId: "406397589059",
  appId: "1:406397589059:web:ebaf9c0904904ae73466f6",
  measurementId: "G-HNT2VTRY3D"
};

firebase.initializeApp(firebaseConfig);


export default firebase;