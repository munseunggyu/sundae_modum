import { useState } from 'react';
import { DropBtn, DropDonContainer, DropDownLi, DropDownUl } from './style';

function DropDown({ chooseCategory, setChooseCategory }) {
  const [open, setOpen] = useState(false);

  const dropdownClick = () => {
    setOpen((prev) => !prev);
  };
  const categoryList = [
    '치킨',
    '중식',
    '패스트푸드',
    '양식',
    '돈까스',
    '회',
    '고기',
    '분식',
    '카페',
  ];
  const showMenu = (e) => {
    setChooseCategory(e.target.textContent);
    dropdownClick();
  };

  return (
    <DropDonContainer>
      <DropBtn onClick={dropdownClick} type="button">
        <span>{chooseCategory}</span>
      </DropBtn>
      <DropDownUl open={open}>
        {categoryList.map((category) => (
          <DropDownLi onClick={showMenu}>{category}</DropDownLi>
        ))}
      </DropDownUl>
    </DropDonContainer>
  );
}
export default DropDown;
