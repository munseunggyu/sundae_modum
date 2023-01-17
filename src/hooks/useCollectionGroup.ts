import { FirebaseError } from "firebase/app";
import {
  collectionGroup,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { ICollection } from "../types/hooks";

const useCollectionGroup = () => {
  const [chats, setChats] = useState<DocumentData[]>([]);
  const getChats = ({ collectionName, whereLeft, whereRight }: ICollection) => {
    try {
      const q = query(
        collectionGroup(db, collectionName),
        where(whereLeft, "==", whereRight),
        orderBy("CreateAt", "asc")
      );
      onSnapshot(q, (querySnapshot) => {
        const newChatting = querySnapshot.docs.map((doc) => {
          return doc.data({ serverTimestamps: "estimate" });
        });
        setChats(newChatting);
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.message);
      }
    }
  };

  return { chats, getChats };
};
export default useCollectionGroup;
