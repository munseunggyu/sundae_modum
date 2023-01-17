import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IDMRoom } from "../types/utils";
import { CreateDMRoomId } from "./CreateDMRoomId";

export const setDM = ({ otherUser, userId }: IDMRoom) => {
  const dmid = CreateDMRoomId({ otherUser, userId });
  const dmRoom = doc(db, "DMROOMS", dmid);

  setDoc(dmRoom, {
    id: dmid,
    CreateAt: serverTimestamp(),
    ids: [otherUser, userId],
  });
};
