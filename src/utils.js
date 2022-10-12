import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"


export const oneCollectionSetDoc = async (collectionName,setData) => {
  const usersDB = doc(collection(db,collectionName))
  await setDoc(usersDB,setData)
}