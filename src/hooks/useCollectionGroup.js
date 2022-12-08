import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

const useCollectionGroup = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  const getChats = (collectionName, whereLeft, whereRight) => {
    try {
      const q = query(
        collectionGroup(db, collectionName),
        where(whereLeft, '==', whereRight),
        orderBy('CreateAt', 'asc')
      );
      // const querySnapshot = await getDocs(q);
      onSnapshot(q, (querySnapshot) => {
        const newChatting = querySnapshot.docs.map((doc) => {
          return doc.data({ serverTimestamps: 'estimate' });
        });
        setChats(newChatting);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return { chats, error, getChats };
};
export default useCollectionGroup;
