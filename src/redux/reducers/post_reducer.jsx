import { CLEAR_CURRENT_POST, SET_CURRENT_POST } from "../actions/types"

const initialPostState = {
  currentPost: null,
  isLoding:true,
}

export default function(state=initialPostState,action){
  switch(action.type){
    case SET_CURRENT_POST:
      return {...state,currentPost: action.payload,isLoding:false}
    case CLEAR_CURRENT_POST:
      return initialPostState
    default:
      return state
  }
}
