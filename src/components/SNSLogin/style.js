import styled from 'styled-components';

export const SNSBtnEl = styled.button`
  padding: 13px 15px;
  width: 17rem;
  border-radius: 44px;
  outline: none;
  border: 0;
  position: relative;
  background-color: transparent;
  border: 1px solid ${(props) => props.btnColor || 'black'};
  img {
    position: absolute;
    left: 14px;
    top: 11px;
  }
  &::before {
    content: '';
    width: 24px;
    height: 24px;
    background: ${(props) => `url(${props.logoImg})`} no-repeat;
    position: absolute;
    top: 11px;
    left: 14px;
  }
`;
