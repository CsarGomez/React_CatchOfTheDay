
import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database'
// import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC915F7Ui9uR3eWnwyP7Jkd0joR85OacOM",
  authDomain: "catch-of-the-day-cdf70.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-cdf70-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;