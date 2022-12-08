import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

const useGetInfo = () => {
  const [userName, setUserName] = useState('');
  const [userPhotoURL, setUserPhotoURL] = useState('');

  const getInfo = (userId) => {
    onSnapshot(doc(db, 'users', userId), (doc) => {
      setUserName(doc.data().displayName);
      setUserPhotoURL(doc.data().photoURL);
    });
  };

  return { userName, userPhotoURL, getInfo };
};

export default useGetInfo;
