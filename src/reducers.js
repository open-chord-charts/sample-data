import {combineReducers} from "redux"

import {SET_SELECTED_KEY} from "./constants"


const selectedKey = (state = "C", action) => {
  switch(action.type) {
    case SET_SELECTED_KEY:
      return action.selectedKey
    default:
      return state
  }
}


const rootReducer = combineReducers({
  selectedKey,
})


export default rootReducer
