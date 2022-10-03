import { CLEAR_USER, SET_USER } from "../actions/types"

const initialUserState = {
  currentUser: null,
  isLoading: true
}
export default function(state=initialUserState,action){
  switch(action.type){
    case SET_USER:
      return {...state,currentUser: action.payload,isLoading:false}
    case CLEAR_USER:
      return initialUserState
    default:
      return state
  }
}