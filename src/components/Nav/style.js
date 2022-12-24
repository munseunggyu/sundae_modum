import styled from "styled-components";

export const NavContainer = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 56px;
  border-top: 0.5px solid rgb(219, 219, 219);
  background-color: white;
`;
export const IconsUl = styled.ul`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 14px 12px;
`;
export const Iconsli = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const IconImg = styled.button`
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  background: url(${(props) => props.icon}) center/24px 24px;
  border: 0;
`;
export const IconSpan = styled.span`
  font-size: 10px;
`;
