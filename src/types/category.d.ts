export interface ICategory {
  select?: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}
export interface IDropDown {
  chooseCategory: string;
  setChooseCategory: React.Dispatch<React.SetStateAction<string>>;
}
