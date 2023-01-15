export const CreateDMRoomId = (selectUser: any, userId: any) => {
  return userId > selectUser
    ? `${selectUser}${userId}`
    : `${userId}${selectUser}`;
};
