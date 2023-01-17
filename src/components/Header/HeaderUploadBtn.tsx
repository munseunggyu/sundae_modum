import React from "react";
import { IOnSubmit } from "../../types/header";
import * as S from "./style";

export default function HeaderUploadBtn({ onSubmit }: IOnSubmit) {
  return <S.UploadBtn onClick={onSubmit}>업로드</S.UploadBtn>;
}
