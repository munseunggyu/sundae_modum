import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { ISubmitChat } from "../types/hooks";

const useSubmitChat = () => {
  const [chat, setChat] = useState("");
  const sendChat = async ({
    collectionName1,
    id,
    collectionName2,
    data,
  }: ISubmitChat) => {
    const docRef = collection(db, collectionName1);
    const newId = doc(collection(docRef, id, collectionName2));
    await Promise.all([setDoc(newId, { ...data, chatId: newId.id })]);
  };

  return { chat, setChat, sendChat };
};

export default useSubmitChat;
