import styled from "styled-components";

export const Postli = styled.li`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 5px;
  &:first-child {
    /* margin-top:5px; */
  }
  &:last-child {
    border: 0;
  }
`;

export const PostBtn = styled.div`
  width: 100%;
  padding-bottom: 5px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PostContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const UserProfileImg = styled.img`
  width: 42px;
  height: 42px;
  background-color: transparent;
  border-radius: 50%;
  margin: 10px 10px 10px 0;
`;
export const PostImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  overflow: hidden;
`;
export const PostTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
export const PostTextBottomContainer = styled.div`
  display: flex;
  gap: 3px;
  font-size: 12px;
  line-height: 18px;
  span {
  }
`;
export const PartyContainer = styled.div`
  display: flex;
`;
export const PartyUser = styled.img`
  width: 14px;
  height: 14px;
`;
