import React from "react";
import * as S from "./style";

export default function HeaderUploadBtn({ onSubmit }) {
  return <S.UploadBtn onClick={onSubmit}>업로드</S.UploadBtn>;
}
