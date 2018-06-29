import Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore'

let config = {
    apiKey: "AIzaSyCS1j4wHn1BCeEGKU-LB333AqGZf8Amt88",
    authDomain: "lyrics-3f76c.firebaseapp.com",
    databaseURL: "https://lyrics-3f76c.firebaseio.com",
    projectId: "lyrics-3f76c",
    storageBucket: "lyrics-3f76c.appspot.com",
    messagingSenderId: "517269027602"

  };

const firebaseApp = Firebase.initializeApp(config);

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.firestore();