import styled from "styled-components";
import Category from "../Category";

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

function Header({ ir, children, category, select, setSelect }) {
  return (
    <>
      <HeaderContainer>
        <HeaderWrappper>
          {ir && <h1 className="ir"> {ir} </h1>}
          {children}
        </HeaderWrappper>
        {category && <Category select={select} setSelect={setSelect} />}
      </HeaderContainer>
    </>
  );
}

export default Header;
