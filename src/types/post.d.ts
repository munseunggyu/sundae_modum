export interface IPost {
  CreateAt?: { seconds: number; nanoseconds: number };
  category?: string;
  party?: { participants: IParty; participateCount: number };
  postDate?: string;
  postImg?: string | null;
  postTime?: string;
  postTit?: string;
  postTxt?: string;
  postkey?: string;
  writerId?: string;
}

interface IParty {
  participants: string[] | [];
  participateCount: number;
}
