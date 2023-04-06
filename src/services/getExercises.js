import {collection, getDocs} from 'firebase/firestore';
import {db, storage} from '../firebase/firebase';
import {ref, getDownloadURL} from 'firebase/storage';
export default async () => {
  let exercises = [];
  let image = null;
  try {
    const querySnapshot = await getDocs(collection(db, 'exercises'));

    getDownloadURL(ref(storage, 'Brzuch')).then(url => {
      image = url;
    });
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      exercises.push(doc.data());
      // console.log(doc.data());

      // console.log(
      //   exercises.map(item => {
      //     return {desc: item.desc, title: item.title, img: 'Siemka'};
      //   }),
      // );

      //  console.log(doc.id, ' => ', doc.data());
      //   })

      // .catch(error => {
      //   // obsługa błędów
    });
  } catch (error) {
    console.log(error);
  }

  return exercises;
};
