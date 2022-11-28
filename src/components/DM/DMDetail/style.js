import styled from 'styled-components';
import arrow from '../../../assets/arrow-left.png';

export const DMDetailContainer = styled.ul`
  width: 100%;
  background-color: #f2f2f2;
  min-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
`;

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

// DMChatting
export const DMChattingLi = styled.li`
  display: flex;
  justify-content: ${(props) => (props.other ? 'flex-start' : 'flex-end')};
  margin-top: 10px;
`;
export const UserProfile = styled.img`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  margin-right: 12px;
`;
export const ChatContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: ${(props) => (props.other ? 'row' : 'row-reverse')};
  max-width: 70%;
`;
export const ChatP = styled.p`
  display: inline-block;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  border-radius: ${(props) =>
    props.other ? '0px 10px 10px' : '10px 0 10px 10px'};
  font-size: 14px;
  line-height: 20px;
  padding: 12px;
  max-width: 300px;
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word;
`;

export const ChatTime = styled.time`
  font-size: 10px;
  align-self: flex-end;
`;
