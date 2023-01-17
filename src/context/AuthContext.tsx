import { onAuthStateChanged } from "@firebase/auth";
import { doc, DocumentData, onSnapshot } from "@firebase/firestore";
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import {
  CLEAR_USER,
  FIRST_SET_USER,
  SET_PHOTO_URL,
  SET_USER,
} from "./context.type";

interface ICurrentUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  introduce?: string;
  uid: string;
}

interface IAuthAction {
  type: string;
  payload: ICurrentUser;
}
interface IState {
  currentUser: ICurrentUser | null;
  isLoading: boolean;
}
interface IContext {
  state: IState;
  dispatch: React.Dispatch<any>;
}
const initialUserState: IState = {
  currentUser: null,
  isLoading: true,
};
const intialContext = {
  state: initialUserState,
  dispatch: () => null,
};

// context 객체를 생성합니다.
const AuthContext = createContext<IContext>(intialContext);

const authReducer = (state: IState, action: IAuthAction) => {
  switch (action.type) {
    case FIRST_SET_USER:
      return { ...state, currentUser: action.payload, isLoading: true };
    case SET_USER:
      return { ...state, currentUser: action.payload, isLoading: false };
    case CLEAR_USER:
      return initialUserState;
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialUserState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), async (doc: DocumentData) => {
          if (!doc.data()) {
            dispatch({ type: FIRST_SET_USER, payload: user });
            navigate("/firstedit");
            return;
          }
          dispatch({ type: SET_USER, payload: doc.data() });
        });
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
