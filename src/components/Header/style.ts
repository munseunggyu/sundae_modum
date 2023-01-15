import styled from "styled-components";
import headerLogo from "../../assets/header-logo.png";
import arrow from "../../assets/arrow-left.png";
import { motion } from "framer-motion";

// index
export const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  min-height: 48px;
  overflow: hidden;
  border-bottom: 0.5px solid rgb(219, 219, 219);
  background-color: white;
  z-index: 10;
`;
export const HeaderWrappper = styled.header`
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  font-weight: 600;
  position: relative;
`;

// title
export const HeaderH1 = styled.h1`
  font-size: 22px;
  margin-left: 50px;
  position: relative;
  &::before {
    content: "";
    background: url(${headerLogo}) center/50px 50px;
    position: absolute;
    width: 50px;
    height: 50px;
    top: -13px;
    left: -50px;
  }
`;

// upload
export const UploadBtn = styled.button`
  background-color: var(--main-color);
  width: 80px;
  position: absolute;
  right: 12px;
  height: 28px;
  color: white;
  border-radius: 32px;
  font-size: 14px;
`;

// prev
export const PrvBtn = styled.button`
  background: url(${arrow});
  width: 22px;
  height: 22px;
`;
export const LeftIconBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
`;
export const UserName = styled.div`
  top: 1px;
  position: relative;
`;

// searchbtn
export const SearchInput = styled(motion.input)`
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
export const RightIconBtn = styled.button<{ icon: string }>`
  background: url(${(props) => props.icon}) center no-repeat;
  width: 22px;
  height: 22px;
`;
