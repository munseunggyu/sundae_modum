import styled from 'styled-components';

export const DMRoomUl = styled.ul`
  padding-top: 12px;
`;

export const NoDMRoom = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 300px;
  opacity: 0.5;
`;

// DMROOM
export const DMRoomli = styled.li`
  margin-bottom: 24px;
`;
export const DMBtn = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: flex-end;
`;
export const UserImg = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;
export const TxtContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  position: relative;
`;
export const UserName = styled.strong`
  font-weight: 500;
  font-size: 16px;
  position: relative;
  top: ${(props) => (props.isLastChat ? '0' : '-17px')};
`;
export const LastChatting = styled.p`
  font-size: 12px;
  opacity: 0.6;
`;

export const Time = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0.7;
  font-size: 12px;
`;
