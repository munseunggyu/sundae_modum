import { useEffect } from "react";
import useGetInfo from "../../../hooks/useGetInfo";
import * as S from "./style";
interface IPartyName {
  userId: string;
  length: number;
  index: number;
}
function PartyName({ userId, length, index }: IPartyName) {
  const { userName, getInfo } = useGetInfo();

  useEffect(() => {
    getInfo(userId);
  }, []);
  return (
    <S.PartyNameContainer>
      {userName} {length !== index + 1 && "/"}
    </S.PartyNameContainer>
  );
}

export default PartyName;
