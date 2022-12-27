export const CreateDMRoomId = (selectUser, userId) => {
  return userId > selectUser
    ? `${selectUser}${userId}`
    : `${userId}${selectUser}`;
};
