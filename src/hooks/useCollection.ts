import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ICollection } from "../types/hooks";

const useCollection = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isLoding, setIsLoding] = useState(true);
  const navigate = useNavigate();
  const getDocuments = async ({
    collectionName,
    whereLeft,
    whereRight,
    condition,
  }: ICollection) => {
    const docRef = collection(db, collectionName);
    const q = query(
      docRef,
      where(whereLeft, condition, whereRight),
      orderBy("CreateAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setDocuments(newArr);
      if (newArr.length <= 0) {
        navigate("/");
        return;
      }
      setIsLoding(false);
    });
  };
  return { documents, getDocuments, isLoding };
};

export default useCollection;
