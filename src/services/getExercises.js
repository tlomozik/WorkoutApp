import {collection, getDocs} from 'firebase/firestore';
import {db, storage} from '../firebase/firebase';
import {ref, getDownloadURL} from 'firebase/storage';
import {useState} from 'react';

export default async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'exercises'));
    const storageRef = ref(storage, 'test');

    const url = await getDownloadURL(storageRef);

    const exercises = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      img: url,
    }));

    return {exercises};
  } catch (error) {
    console.log(error);
  }
};
