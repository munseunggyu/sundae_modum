import React from "react";
import styled from "styled-components";
import headerLogo from "../../assets/header-logo.png";

const HeaderH1 = styled.h1`
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
export default function HeaderTitle({ children }) {
  return <HeaderH1>{children}</HeaderH1>;
}
