import { IHeader } from "../../types/header";
import Category from "../Category";
import * as S from "./style";

function Header({ ir, children, category, select, setSelect }: IHeader) {
  return (
    <>
      <S.HeaderContainer>
        <S.HeaderWrappper>
          {ir && <h1 className="ir"> {ir} </h1>}
          {children}
        </S.HeaderWrappper>
        {category && <Category select={select} setSelect={setSelect} />}
      </S.HeaderContainer>
    </>
  );
}

export default Header;
