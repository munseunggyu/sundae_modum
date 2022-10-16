import { SET_CURRENT_POST } from "../actions/types"

const initialPostState = {
  currentPost: null,
}

export default function(state=initialPostState,action){
  switch(action.type){
    case SET_CURRENT_POST:
      return {...state,currentPost: action.payload}
    default:
      return state
  }
}