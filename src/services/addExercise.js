import {setDoc, doc} from 'firebase/firestore';
import {db, storage} from '../firebase/firebase';
import {ref, uploadBytes} from 'firebase/storage';
//import '@react-native-firebase/firestore';
//import RNFetchBlob from 'rn-fetch-blob';

export default async (exercise, category, image) => {
  // const fs = RNFetchBlob.fs;

  // RNFetchBlob.fs.readFile(image, 'base64').then(data => {
  //   console.log(data);
  // });
  const storageRef = ref(storage, category);
  const exerciseRef = doc(db, 'exercises', exercise);
  const metadata = {
    contentType: 'image/jpg',
  };

  setDoc(exerciseRef, {title: exercise, desc: category});

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', image, true);
    xhr.send(null);
  });

  uploadBytes(storageRef, blob);

  // RNFetchBlob.fs
  //   .readFile(image, 'base64')
  //   .then(data => {
  //     console.log(data);

  //     return uploadBytes(storageRef, data, metadata);
  //   })
  //   .then(() => {
  //     console.log('Plik został przesłany do Firebase Storage.');
  //   })
  //   .catch(error => {
  //     console.log('Wystąpił błąd:', error);
  //   });
};
