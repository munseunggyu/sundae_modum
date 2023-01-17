export interface ISetDM {
  otherUser: string;
  userId: string;
}

export interface IHandleVertical {
  userId: string;
  writerId: string;
  title1: string;
  deleteFc: () => void;
  title2: string;
  setDM: ({ otherUser, userId }: ISetDM) => void;
}
export interface IDMRoom {
  otherUser: string;
  userId: string;
}
