import React from "react";
import verticalIcon from "../../assets/icons/icon-more-vertical.png";
import * as S from "./style";

export default function VerticalBtn({ verticalSubmit }: any) {
  return (
    <S.RightIconBtn
      type="button"
      icon={verticalIcon}
      onClick={verticalSubmit}
    />
  );
}
