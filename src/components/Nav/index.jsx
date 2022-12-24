import styled from "styled-components";
import edit from "../../assets/icons/icon-edit.png";
import editFill from "../../assets/icons/icon-edit-fill.png";
import home from "../../assets/icons/icon-home.png";
import homeFill from "../../assets/icons/icon-home-fill.png";
import user from "../../assets/icons/icon-user.png";
import userFill from "../../assets/icons/icon-user-fill.png";
import message from "../../assets/icons/icon-message-circle.png";
import messageFill from "../../assets/icons/icon-message-fill.png";
import { Link, useMatch, useNavigate } from "react-router-dom";
import * as S from "./style";

function Nav() {
  const navigate = useNavigate();

  const homeMatch = useMatch("/");
  const dmMatch = useMatch("/dm");
  const profileMatch = useMatch("/profile");
  const postUploadMatch = useMatch("/postupload");
  return (
    <S.NavContainer>
      <h2 className="ir"> 탭 메뉴 </h2>
      <S.IconsUl>
        <S.Iconsli onClick={() => navigate("/")}>
          <S.IconImg icon={homeMatch ? homeFill : home} />
          <S.IconSpan>홈</S.IconSpan>
        </S.Iconsli>
        <S.Iconsli onClick={() => navigate("/dm")}>
          <S.IconImg icon={dmMatch ? messageFill : message} />
          <S.IconSpan>채팅</S.IconSpan>
        </S.Iconsli>

        <S.Iconsli onClick={() => navigate("/postupload")}>
          <S.IconImg icon={postUploadMatch ? editFill : edit} />
          <S.IconSpan>게시물 작성</S.IconSpan>
        </S.Iconsli>
        <S.Iconsli onClick={() => navigate("/profile")}>
          <S.IconImg icon={profileMatch ? userFill : user} />
          <S.IconSpan>프로필</S.IconSpan>
        </S.Iconsli>
      </S.IconsUl>
    </S.NavContainer>
  );
}

export default Nav;
