import {combineReducers} from "redux"
import undoable, {distinctState} from "redux-undo"

import {COMMIT_CHART, EDIT_CHART, REMOVE_CHART_PART, SET_SELECTED_KEY} from "./constants"


// Bench reducers


export const appInfo = (state = {}) => state


export const selectedKey = (state = "C", action) => {
  switch(action.type) {
    case SET_SELECTED_KEY:
      return action.selectedKey
    default:
      return state
  }
}


// Chart reducers


export const data = (state = {}, action) => {
  if (state.slug !== action.slug) {
    return state
  }
  switch(action.type) {
    case REMOVE_CHART_PART:
      return {
        ...state,
        structure: [
          ...state.structure.slice(0, action.partIndexInStructure),
          ...state.structure.slice(action.partIndexInStructure + 1),
        ],
      }
    default:
      return state
  }
}


const undoableData = (slug) => undoable(data, {
  // debug: true,
  filter: distinctState(),
  redoType: `REDO/${slug}`,
  undoType: `UNDO/${slug}`,
})


export const isEdited = (slug) => (state = false, action) => {
  if (slug !== action.slug) {
    return state
  }
  switch(action.type) {
    case COMMIT_CHART:
      return false
    case EDIT_CHART:
      return true
    default:
      return state
  }
}


export const chart = (state = {}, action) => ({
  data: undoableData(state.data.present.slug)(state.data, action),
  isEdited: isEdited(state.data.present.slug)(state.isEdited, action),
})


export const charts = (state = [], action) => state.map((chart1) => chart(chart1, action))


// Root reducer


export const rootReducer = combineReducers({
  appInfo,
  charts,
  selectedKey,
})
