import { ReactNode } from "react";

export interface IHeader {
  ir?: string;
  children?: ReactNode;
  category?: string;
  select?: string;
  setSelect?: string;
}

export interface IPrev {
  userName?: string;
}

export interface IChildren {
  children?: ReactNode;
}

export interface ISubmit {
  onSubmit: () => void;
}
