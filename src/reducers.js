import {combineReducers} from "redux"

import {COMMIT_CHART, EDIT_CHART, REMOVE_CHART_PART, SET_SELECTED_KEY} from "./constants"


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
    case COMMIT_CHART:
      return action.chartSlug === state.slug ?
        {
          ...state,
          edited: false,
        } :
        state
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
          structure: [
            ...state.structure.slice(0, action.partIndexInStructure),
            ...state.structure.slice(action.partIndexInStructure + 1),
          ],
        } :
        state
    default:
      return state
  }
}


const charts = (state = [], action) => state.map((item) => chart(item, action))


// Root reducer


const rootReducer = combineReducers({
  appInfo,
  charts,
  selectedKey,
})


export default rootReducer
