import styled, { keyframes } from 'styled-components';
import searchIcon from '../assets/icons/icon-search.png';
import { IrH1 } from './TextHide';
import arrow from '../assets/arrow-left.png';
import headerLogo from '../assets/header-logo.png';
import verticalIcon from '../assets/icons/icon-more-vertical.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  min-height: 48px;
  overflow: hidden;
  border-bottom: 0.5px solid rgb(219, 219, 219);
  background-color: white;
  z-index: 10;
`;
const HeaderWrappper = styled.header`
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  font-weight: 600;
  position: relative;
`;
const HeaderH1 = styled.h1`
  font-size: 22px;
  margin-left: 50px;
  position: relative;
  &::before {
    content: '';
    background: url(${headerLogo}) center/50px 50px;
    position: absolute;
    width: 50px;
    height: 50px;
    top: -13px;
    left: -50px;
  }
`;
const RightIconBtn = styled.button`
  background: url(${(props) => props.icon}) center no-repeat;
  width: 22px;
  height: 22px;
`;

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

const UploadBtn = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  width: 80px;
  height: 22px;
  color: white;
  border-radius: 32px;
  font-size: 14px;
`;
const PrvBtn = styled.button`
  background: url(${arrow});
  width: 22px;
  height: 22px;
`;
const LeftIconBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
`;
const UserName = styled.div`
  top: 1px;
  position: relative;
`;

function Header({
  h1,
  prv,
  ir,
  search,
  upload,
  vertical,
  userName,
  onSubmit,
  verticalSubmit,
  handleSearch,
  setIsSearch,
  children,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen === true) {
      setIsSearch(false);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        <HeaderWrappper>
          {h1 && <HeaderH1> {h1} </HeaderH1>}
          {ir && <IrH1> {ir} </IrH1>}
          {prv && (
            <LeftIconBtn>
              <PrvBtn onClick={() => navigate(-1)} />
              {userName && <UserName> {userName} </UserName>}
            </LeftIconBtn>
          )}
          {vertical && (
            <RightIconBtn
              type="button"
              icon={verticalIcon}
              onClick={verticalSubmit}
            />
          )}
          {search && <RightIconBtn icon={searchIcon} onClick={toggleSearch} />}
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
          {upload && <UploadBtn onClick={onSubmit}>업로드</UploadBtn>}
        </HeaderWrappper>
        {children}
      </HeaderContainer>
    </>
  );
}

export default Header;
