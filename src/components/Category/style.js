import styled from "styled-components";

export const CategoryCon = styled.article`
  max-width: 450px;
  margin: 0 auto;
  padding: 14px 18px;
  font-weight: 600;
  position: relative;
  text-align: center;
`;
export const CategorySpan = styled.span`
  font-size: 14px;
  color: ${(props) => (props.changeColor ? "black" : "#dbdbdb")};
  cursor: pointer;
`;
