import { IDMRoom } from "../types/utils";

export const CreateDMRoomId = ({ otherUser, userId }: IDMRoom) => {
  return userId > otherUser ? `${otherUser}${userId}` : `${userId}${otherUser}`;
};
