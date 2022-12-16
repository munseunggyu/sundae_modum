import styled from "styled-components";
import arrow from "../../assets/arrow-left.png";

export const ChattingFormContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const ChattingForm = styled.form`
  position: fixed;
  bottom: 0;
  max-width: 450px;
  width: 100%;
`;
export const ChattingInput = styled.input`
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 15px 30px 15px 15px;
  border: 0;
  border-top: 0.5px solid #dbdbdb;
`;

export const ChattingSubmitBtn = styled.button`
  position: absolute;
  right: 10px;
  background: url(${arrow});
  transform: rotateY(180deg);
  width: 22px;
  height: 22px;
  top: 15px;
`;
