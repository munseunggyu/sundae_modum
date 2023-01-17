import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import searchIcon from "../../assets/icons/icon-search.png";
import { ISeactButton } from "../../types/header";
import * as S from "./style";

export default function SearchButton({
  handleSearch,
  setIsSearch,
}: ISeactButton) {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen === true) {
      setIsSearch(false);
    }
  };
  return (
    <>
      <S.RightIconBtn icon={searchIcon} onClick={toggleSearch} />
      <AnimatePresence>
        {searchOpen && (
          <S.SearchInput
            onChange={handleSearch}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3 }}
            placeholder="검색어를 입력하세요."
          />
        )}
      </AnimatePresence>
    </>
  );
}
