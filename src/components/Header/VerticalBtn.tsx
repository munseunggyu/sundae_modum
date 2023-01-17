import React from "react";
import verticalIcon from "../../assets/icons/icon-more-vertical.png";
import { IVerticalSubmit } from "../../types/header";
import * as S from "./style";

export default function VerticalBtn({ verticalSubmit }: IVerticalSubmit) {
  return (
    <S.RightIconBtn
      type="button"
      icon={verticalIcon}
      onClick={verticalSubmit}
    />
  );
}
