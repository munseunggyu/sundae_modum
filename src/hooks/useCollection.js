import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase';

const useCollection = (isPostDetail) => {
  const [documents, setDocuments] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const getDocuments = (collectionName, whereLeft, whereRight, condition) => {
    const docRef = collection(db, collectionName);
    const q = query(
      docRef,
      where(whereLeft, condition, whereRight, orderBy('CreateAt', 'desc'))
    );
    onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      isPostDetail ? setDocuments(...newArr) : setDocuments(newArr);
      if (isPostDetail) {
        if (newArr.length <= 0) {
          Navigate('/');
          return;
        }
      }
      setIsLoding(false);
    });
  };
  return { documents, getDocuments, isLoding };
};

export default useCollection;
