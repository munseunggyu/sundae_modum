import React, { PropsWithChildren } from "react";
import * as S from "./style";

export default function HeaderTitle({ children }: PropsWithChildren) {
  return <S.HeaderH1>{children}</S.HeaderH1>;
}
