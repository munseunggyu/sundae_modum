import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/icons/icon-search.png";

const SearchInput = styled(motion.input)`
  transform-origin: right center;
  font-size: 16px;
  right: 40px;
  width: 130px;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  padding: 3px;
  position: absolute;
  padding: 5px;
  font-size: 12px;
`;
const RightIconBtn = styled.button`
  background: url(${(props) => props.icon}) center no-repeat;
  width: 22px;
  height: 22px;
`;

export default function SearchButton({ handleSearch, setIsSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen === true) {
      setIsSearch(false);
    }
  };
  return (
    <>
      <RightIconBtn icon={searchIcon} onClick={toggleSearch} />
      <AnimatePresence>
        {searchOpen && (
          <SearchInput
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
