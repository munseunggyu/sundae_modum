import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const { state, dispatch } = useContext(AuthContext);

  // 이제 context안에는 AuthContext에서 반환하는 state 값(user), dispatch 함수 두 가지가 들어있습니다.
  return { state, dispatch };
};
