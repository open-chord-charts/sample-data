import {combineReducers} from "redux"

import {EDIT_CHART, REMOVE_CHART_PART, SET_SELECTED_KEY} from "./constants"


// Bench reducers


const appInfo = (state = {}) => state


const selectedKey = (state = "C", action) => {
  switch(action.type) {
    case SET_SELECTED_KEY:
      return action.selectedKey
    default:
      return state
  }
}


// Chart reducers


export const chart = (state = {}, action) => {
  switch(action.type) {
    case EDIT_CHART:
      return action.chartSlug === state.slug ?
        {
          ...state,
          edited: true,
        } :
        state
    case REMOVE_CHART_PART:
      return action.chartSlug === state.slug ?
        {
          ...state,
          structure: structure(state.structure, action),
        } :
        state
    default:
      return state
  }
}


const charts = (state = [], action) => {
  switch(action.type) {
    case EDIT_CHART:
    case REMOVE_CHART_PART:
      return state.map((item) => chart(item, action))
    default:
      return state
  }
}


const structure = (state = [], action) => {
  switch(action.type) {
    case REMOVE_CHART_PART:
      return state.filter((item) => item !== action.partName)
    default:
      return state
  }
}




// Root reducer


const rootReducer = combineReducers({
  appInfo,
  charts,
  selectedKey,
})


export default rootReducer
