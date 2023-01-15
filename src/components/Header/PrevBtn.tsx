import React from "react";
import { useNavigate } from "react-router-dom";
import { IPrev } from "../../types/header";
import * as S from "./style";

export default function PrevBtn({ userName }: IPrev) {
  const navigate = useNavigate();

  return (
    <S.LeftIconBtn>
      <S.PrvBtn onClick={() => navigate(-1)} />
      {userName && <S.UserName> {userName} </S.UserName>}
    </S.LeftIconBtn>
  );
}
