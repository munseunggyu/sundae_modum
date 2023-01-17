interface IDMChat {
  chat: string;
  id: string;
  CreateAt: FieldValue;
  writerId: string | undefined;
}
interface IPostChat {
  currentPostId: string | undefined;
  CreateAt: FieldValue;
  chatTxt: string;
  writerId: string | undefined;
}

export interface ISubmitChat {
  collectionName1: string;
  id: string;
  collectionName2: string;
  data: IDMChat | IPostChat;
}
export interface ICollection {
  collectionName: string;
  whereLeft: string;
  whereRight?: string | string[];
  condition?: any;
}
