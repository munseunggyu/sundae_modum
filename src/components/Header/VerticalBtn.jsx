import React from "react";
import styled from "styled-components";
import verticalIcon from "../../assets/icons/icon-more-vertical.png";

const RightIconBtn = styled.button`
  background: url(${(props) => props.icon}) center no-repeat;
  width: 22px;
  height: 22px;
`;

export default function VerticalBtn({ verticalSubmit }) {
  return (
    <RightIconBtn type="button" icon={verticalIcon} onClick={verticalSubmit} />
  );
}
