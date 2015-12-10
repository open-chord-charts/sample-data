import {combineReducers} from "redux"
import undoable, {distinctState} from "redux-undo"

import {COMMIT_CHART, EDIT_CHART, REMOVE_PART, SELECT_CHORD, SELECT_KEY, SELECT_CHORD_KEY} from "./constants"
import {selectDegreeFromKey} from "./selectors"


// Bench reducers


export const appInfo = (state = {}) => state


export const selectedKey = (state = "C", action) => {
  switch(action.type) {
    case SELECT_KEY:
      return action.key
    default:
      return state
  }
}


// Chart reducers


export const data = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_PART:
      return state.slug === action.chartSlug ?
        {
          ...state,
          structure: [
            ...state.structure.slice(0, action.index),
            ...state.structure.slice(action.index + 1),
          ],
        } :
        state
    case SELECT_CHORD_KEY:
      return state.slug === action.chartSlug ?
        {
          ...state,
          parts: {
            ...state.parts,
            [action.partName]: [
              ...state.parts[action.partName].slice(0, action.index),
              {
                ...state.parts[action.partName][action.index],
                degree: selectDegreeFromKey(action.key, state.key),
              },
              ...state.parts[action.partName].slice(action.index + 1),
            ],
          },
        } :
        state
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
  switch(action.type) {
    case COMMIT_CHART:
      return slug === action.slug ? false : state
    case EDIT_CHART:
      return slug === action.slug ? true : state
    default:
      return state
  }
}


export const selectedChord = (slug) => (state = {}, action) => {
  switch(action.type) {
    case COMMIT_CHART:
      return slug === action.slug ? {} : state
    case REMOVE_PART:
      return slug === action.chartSlug ? {} : state
    case SELECT_CHORD:
      return slug === action.chartSlug ?
        {
          index: action.index,
          partName: action.partName,
        } :
        state
    default:
      return state
  }
}


export const chart = (state = {}, action) => ({
  data: undoableData(state.data.present.slug)(state.data, action),
  isEdited: isEdited(state.data.present.slug)(state.isEdited, action),
  selectedChord: selectedChord(state.data.present.slug)(state.selectedChord, action),
})


export const charts = (state = [], action) => state.map((chart1) => chart(chart1, action))


// Root reducer


export const rootReducer = combineReducers({
  appInfo,
  charts,
  selectedKey,
})
