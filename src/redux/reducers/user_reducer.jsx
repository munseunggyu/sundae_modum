import { CLEAR_USER, FIRST_SET_USER, SET_PHOTO_URL, SET_USER } from "../actions/types"

const initialUserState = {
  currentUser: null,
  isLoading: true
}
export default function(state=initialUserState,action){
  switch(action.type){
    case FIRST_SET_USER:
      return {...state,currentUser: action.payload,isLoading:true}
    case SET_USER:
      return {...state,currentUser: action.payload,isLoading:false}
    case CLEAR_USER:
      return initialUserState
    case SET_PHOTO_URL:
      return {...state,
        currentUser:{...state.currentUser,photoURL:action.payload},
        isLoading:false
      }
    default:
      return state
  }
}