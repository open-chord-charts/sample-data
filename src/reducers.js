// import {combineReducers} from "redux"

import {SET_CHART_KEY} from "./actions"


const chartKey = (state = "C", action) => {
  switch(action.type) {
    case SET_CHART_KEY:
      return action.chartKey
    default:
      return state
  }
}


export default chartKey
