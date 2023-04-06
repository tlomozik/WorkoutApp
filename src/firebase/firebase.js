// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0tdABtoMj4Ga73sHjww6a83-K3k5ddUA',
  authDomain: 'workout-app-79c7a.firebaseapp.com',
  projectId: 'workout-app-79c7a',
  storageBucket: 'workout-app-79c7a.appspot.com',
  messagingSenderId: '637778683568',
  appId: '1:637778683568:web:f51e617000c0b695d0fd75',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export {db, storage};
