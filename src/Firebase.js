import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from './FirebaseConfig'


firebase.initializeApp(firebaseConfig);


export default firebase;