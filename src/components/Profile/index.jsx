import styled from "styled-components"
import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import userImg from '../../assets/user-profile.png'

const ProfileContainer = styled.div`
  width:100%;
  text-align:center;
  margin-top:20px;
`;

const UserProfileImg = styled.img`
  width:110px;
  height:110px;
  border-radius:50%;
`;

function ProfilePage(){
  return(
    <>
      <Header prv={true} vertical={true} />
      <MainContainer>
        <ProfileContainer>
          <UserProfileImg src={userImg} />
        </ProfileContainer>
      </MainContainer>
    </>
  )
}

export default ProfilePage