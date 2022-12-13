import React from "react";
import styled from "styled-components";

const UploadBtn = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  width: 80px;
  height: 22px;
  color: white;
  border-radius: 32px;
  font-size: 14px;
`;

export default function HeaderUploadBtn({ onSubmit }) {
  return <UploadBtn onClick={onSubmit}>업로드</UploadBtn>;
}
