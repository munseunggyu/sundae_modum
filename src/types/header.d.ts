import { ReactNode } from "react";

export interface IHeader {
  ir?: string;
  children?: ReactNode;
  category?: string;
  select?: string;
  setSelect?: Dispatch<SetStateAction<string>>;
}

export interface IPrev {
  userName?: string;
}

export interface IOnSubmit {
  onSubmit: (e: React.FormEvent) => Promise<void>;
}
export interface ISeactButton {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IVerticalSubmit {
  verticalSubmit: () => void;
}
