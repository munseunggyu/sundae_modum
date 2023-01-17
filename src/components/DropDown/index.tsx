import React, { useState } from "react";
import { IDropDown } from "../../types/category";
import * as S from "./style";

function DropDown({ chooseCategory, setChooseCategory }: IDropDown) {
  const [open, setOpen] = useState(false);
  const dropdownClick = () => {
    setOpen((prev) => !prev);
  };
  const categoryList = [
    "치킨",
    "중식",
    "패스트푸드",
    "양식",
    "돈까스",
    "회",
    "고기",
    "분식",
    "카페",
  ];
  const showMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    const categoryName = (e.target as HTMLLIElement).textContent;
    if (!categoryName) return;
    setChooseCategory(categoryName);
    dropdownClick();
  };

  return (
    <S.DropDonContainer>
      <S.DropBtn onClick={dropdownClick} type="button">
        <span>{chooseCategory}</span>
      </S.DropBtn>
      <S.DropDownUl open={open}>
        {categoryList.map((category) => (
          <S.DropDownLi onClick={showMenu}>{category}</S.DropDownLi>
        ))}
      </S.DropDownUl>
    </S.DropDonContainer>
  );
}
export default DropDown;
