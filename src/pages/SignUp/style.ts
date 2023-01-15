import styled from "styled-components";
import arrowLeft from "../../assets/arrow-left.png";

export const SignContainer = styled.article`
  margin: 78px auto 0;
  width: 100%;
  max-width: 450px;
  padding: 20px;
  position: relative;
`;
export const SignH1 = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;
export const SignFormContainer = styled.form`
  width: 100%;
  margin-top: 25px;
  a {
    display: block;
    text-align: center;
    margin-top: 10px;
  }
`;
export const SignLabel = styled.label`
  display: block;
  margin: 15px 0;
  font-size: 14px;
`;
export const SignInput = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  width: 100%;
  outline: none;
  padding-bottom: 5px;
  font-size: 14px;
  margin-bottom: 5px;
`;
export const SignSubmitBtn = styled.input`
  width: 100%;
  border-radius: 44px;
  padding: 13px 0;
  font-size: 18px;
  color: white;
  background-color: var(--main-color);
  margin-top: 20px;
  border: 0;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
export const PrevPage = styled.button`
  top: 18px;
  position: absolute;
  border: 0;
  background-color: transparent;
  &::before {
    content: "";
    background: url(${arrowLeft});
    width: 24px;
    height: 24px;
    position: absolute;
  }
`;
export const ErrorMessageP = styled.p`
  font-size: 10px;
  font-weight: 300;
  margin-top: 5px;
  margin-right: auto;
`;
