import styled from "styled-components";

export const SNSLoginContainer = styled.article`
  width: 100%;
`;
export const LogoContainer = styled.div`
  background-color: #006cb2;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LogoImg = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 10%;
`;
export const LoginBtnContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 5rem;
  top: -1.25rem;
  position: relative;
  border-radius: 20px 20px 0px 0px;
`;
export const LoginBtns = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const SNSBtn = styled.button<{ btnColor?: string; logoImg: string }>`
  padding: 13px 15px;
  width: 17rem;
  border-radius: 44px;
  outline: none;
  border: 0;
  position: relative;
  background-color: transparent;
  border: 1px solid ${(props) => props.btnColor || "black"};
  img {
    position: absolute;
    left: 14px;
    top: 11px;
  }
  &::before {
    content: "";
    width: 24px;
    height: 24px;
    background: ${(props) => `url(${props.logoImg})`} no-repeat;
    position: absolute;
    top: 11px;
    left: 14px;
  }
`;
export const EmailRegisterContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  a {
    color: #808080;

    position: relative;
    &:first-child {
      margin-right: 12px;
    }
    &:first-child::after {
      top: 1px;
      content: "";
      width: 1px;
      height: 15px;
      background-color: rgb(196, 196, 196);
      position: absolute;
      margin-left: 6px;
    }
  }
`;
