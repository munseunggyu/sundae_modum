import useWriter from "../../../hooks/useGetInfo";
import * as S from "./style";

function PartyName({ userId, length, index }) {
  const { userName, getInfo } = useWriter();
  getInfo(userId);
  return (
    <S.PartyNameContainer>
      {userName} {length !== index + 1 && "/"}
    </S.PartyNameContainer>
  );
}

export default PartyName;
