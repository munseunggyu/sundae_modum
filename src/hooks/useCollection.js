import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const useCollection = (isPostDetail, isHome) => {
  const [documents, setDocuments] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const navigate = useNavigate();
  const getDocuments = (collectionName, whereLeft, whereRight, condition) => {
    const docRef = collection(db, collectionName);
    const q = isHome
      ? query(
          docRef,
          where(whereLeft, condition, whereRight),
          orderBy('CreateAt', 'desc')
        )
      : query(
          docRef,
          where(whereLeft, condition, whereRight, orderBy('CreateAt', 'desc'))
        );
    onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      isPostDetail ? setDocuments(...newArr) : setDocuments(newArr);
      if (isPostDetail) {
        console.log();
        if (newArr.length <= 0) {
          navigate('/');
          return;
        }
      }
      setIsLoding(false);
    });
  };
  return { documents, getDocuments, isLoding };
};

export default useCollection;
