export const CreateDMRoomId = (selectUser: string, userId: string) => {
  return userId > selectUser
    ? `${selectUser}${userId}`
    : `${userId}${selectUser}`;
};
