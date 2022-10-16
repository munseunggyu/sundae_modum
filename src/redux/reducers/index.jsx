import { combineReducers } from "redux";
import user from './user_reducer'
import test from './test'
import post from './post_reducer'

const rootReducer = combineReducers({
  user,
  test,
  post
})

export default rootReducer