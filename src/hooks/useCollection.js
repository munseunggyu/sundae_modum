import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

const useCollection = () => {
  const [documents, setDocuments] = useState([]);

  const getDocuments = (collectionName, whereLeft, whereRight, condition) => {
    const docRef = collection(db, collectionName);
    const q = query(
      docRef,
      where(whereLeft, condition, whereRight),
      orderBy('CreateAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        console.log(doc.data());
        return doc.data();
      });
      setDocuments(newArr);
    });
  };
  return { documents, getDocuments };
};

export default useCollection;
