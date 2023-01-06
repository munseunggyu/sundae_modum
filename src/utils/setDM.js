import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CreateDMRoomId } from "./CreateDMRoomId";

export const setDM = (otherUser, userId) => {
  const dmid = CreateDMRoomId(otherUser, userId);
  const dmRoom = doc(db, "DMROOMS", dmid);

  setDoc(dmRoom, {
    id: dmid,
    CreateAt: serverTimestamp(),
    ids: [otherUser, userId],
  });
};
