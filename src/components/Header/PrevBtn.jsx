import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export default function PrevBtn({ userName }) {
  const navigate = useNavigate();

  return (
    <S.LeftIconBtn>
      <S.PrvBtn onClick={() => navigate(-1)} />
      {userName && <S.UserName> {userName} </S.UserName>}
    </S.LeftIconBtn>
  );
}
