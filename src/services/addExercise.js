import {setDoc, doc} from 'firebase/firestore';
import {db, storage} from '../firebase/firebase';
import {ref, uploadString} from 'firebase/storage';
//import '@react-native-firebase/firestore';

export default async (exercise, category, image) => {
  const storageRef = ref(storage, category);
  const exerciseRef = doc(db, 'exercises', exercise);

  setDoc(exerciseRef, {title: exercise, desc: category});
  uploadString(storageRef, image)
    .then(snapshot => {
      console.log('Uploaded a data_url string!');
    })
    .then(docRef => {
      console.log('Obrazek dodany do Firestore!');
    })
    .catch(error => {
      console.log('Błąd podczas dodawania obrazka do Firestore:', error);
    });
};
