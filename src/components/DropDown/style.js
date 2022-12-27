import styled from "styled-components";
import dropDownArrow from "../../assets/dropDown.svg";

export const DropDonContainer = styled.div`
  position: relative;
  display: block;
  border: 1px solid #000;
  width: 113px;
  margin: 0 auto 10px;
`;
export const DropBtn = styled.button`
  display: block;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  font-weight: 400;
  color: rgb(124, 124, 124);
  padding: 8px;
  width: 110px;
  font-size: 12px;
  background-color: #fcfcfc;
  text-align: left;
  cursor: pointer;
  position: relative;
  span {
    margin-left: 5px;
  }
  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 5px;
    background: url(${dropDownArrow}) center/cover;
  }
`;

export const DropDownUl = styled.ul`
  position: absolute;
  display: ${(props) => (props.open ? "black" : "none")};
  font-weight: 400;
  background-color: #fcfcfc;
  width: 110px;
  height: 160px;
  overflow: scroll;
  box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);
`;

export const DropDownLi = styled.li`
  display: block;
  color: rgb(37, 37, 37);
  font-size: 12px;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.mainColor};
    color: white;
  }
`;
