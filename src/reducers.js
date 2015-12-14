import {combineReducers} from "redux"
import undoable, {distinctState} from "redux-undo"

import {
  COMMIT_CHART,
  EDIT_CHART,
  ENABLE_DEV_TOOLS,
  INSERT_CHORD,
  REMOVE_CHORD,
  REMOVE_PART,
  SELECT_CHORD,
  SELECT_PART,
  SET_BENCH_KEY,
  SET_CHORD_ALTERATIONS,
  SET_CHORD_DURATION,
  SET_CHORD_KEY,
} from "./constants"
import * as selectors from "./selectors"


// Bench reducers


export const appInfo = (state = {}) => state


export const isDevToolsEnabled = (state = false, action) => {
  switch(action.type) {
    case ENABLE_DEV_TOOLS:
      return action.enabled
    default:
      return state
  }
}


export const benchKey = (state = "C", action) => {
  switch(action.type) {
    case SET_BENCH_KEY:
      return action.key
    default:
      return state
  }
}


// Chart reducers


export const data = (state = {}, action) => {
  switch(action.type) {
    case INSERT_CHORD:
      return state.slug === action.chartSlug ?
        {
          ...state,
          parts: {
            ...state.parts,
            [action.partName]: [
              ...state.parts[action.partName].slice(0, action.index),
              state.parts[action.partName][action.index],
              ...state.parts[action.partName].slice(action.index),
            ],
          },
        } :
        state
    case REMOVE_CHORD:
      return state.slug === action.chartSlug ?
        {
          ...state,
          parts: {
            ...state.parts,
            [action.partName]: [
              ...state.parts[action.partName].slice(0, action.index),
              ...state.parts[action.partName].slice(action.index + 1),
            ],
          },
        } :
        state
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
    case SET_CHORD_ALTERATIONS:
      return state.slug === action.chartSlug ?
        {
          ...state,
          parts: {
            ...state.parts,
            [action.partName]: [
              ...state.parts[action.partName].slice(0, action.index),
              {
                ...state.parts[action.partName][action.index],
                // TODO Do a merge with existing alterations instead of an affectation.
                alterations: action.alterations === null ? null : [action.alterations],
              },
              ...state.parts[action.partName].slice(action.index + 1),
            ],
          },
        } :
        state
    case SET_CHORD_DURATION:
      return state.slug === action.chartSlug ?
        {
          ...state,
          parts: {
            ...state.parts,
            [action.partName]: [
              ...state.parts[action.partName].slice(0, action.index),
              {
                ...state.parts[action.partName][action.index],
                duration: action.alterations === null ? null : [action.duration],
              },
              ...state.parts[action.partName].slice(action.index + 1),
            ],
          },
        } :
        state
    case SET_CHORD_KEY:
      return state.slug === action.chartSlug ?
        {
          ...state,
          parts: {
            ...state.parts,
            [action.partName]: [
              ...state.parts[action.partName].slice(0, action.index),
              {
                ...state.parts[action.partName][action.index],
                degree: selectors.selectDegreeFromKey(action.key, state.key),
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


export const selection = (slug) => (state = {}, action) => {
  switch(action.type) {
    case COMMIT_CHART:
      return slug === action.slug ? {} : state
    case REMOVE_CHORD:
      return slug === action.chartSlug ?
        {
          ...state,
          index: Math.max(0, action.index - 1),
        } :
        state
    case REMOVE_PART:
      return slug === action.chartSlug ? {} : state
    case SELECT_CHORD:
      return slug === action.chartSlug ?
        {
          index: action.index,
          partName: action.partName,
          type: "chord",
        } :
        state
    case SELECT_PART:
      return slug === action.chartSlug ?
        {
          index: action.index,
          type: "part",
        } :
        state
    default:
      return state
  }
}


export const chart = (state = {}, action) => ({
  data: undoableData(state.data.present.slug)(state.data, action),
  isEdited: isEdited(state.data.present.slug)(state.isEdited, action),
  selection: selection(state.data.present.slug)(state.selection, action),
})


export const charts = (state = [], action) => state.map((chart1) => chart(chart1, action))


// Root reducer


export const rootReducer = combineReducers({
  appInfo,
  charts,
  isDevToolsEnabled,
  benchKey,
})
