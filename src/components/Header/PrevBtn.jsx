import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import arrow from "../../assets/arrow-left.png";

const PrvBtn = styled.button`
  background: url(${arrow});
  width: 22px;
  height: 22px;
`;
const LeftIconBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
`;
const UserName = styled.div`
  top: 1px;
  position: relative;
`;

export default function PrevBtn({ userName }) {
  const navigate = useNavigate();

  return (
    <LeftIconBtn>
      <PrvBtn onClick={() => navigate(-1)} />
      {userName && <UserName> {userName} </UserName>}
    </LeftIconBtn>
  );
}
