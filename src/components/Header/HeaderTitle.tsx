import React from "react";
import { IChildren } from "../../types/header";
import * as S from "./style";

export default function HeaderTitle({ children }: IChildren) {
  return <S.HeaderH1>{children}</S.HeaderH1>;
}
