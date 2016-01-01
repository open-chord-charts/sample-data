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
  SET_CHORD_DURATION,
  SET_CHORD_QUALIFIER,
  SET_CHORD_ROOT_NOTE,
} from "./constants"
import * as helpers from "./helpers"


export const appInfo = (state = {}) => state


export const benchKey = (state = "C", action) => {
  switch(action.type) {
    case SET_BENCH_KEY:
      return action.key
    default:
      return state
  }
}


export const chart = (state = {}, action) => {
  switch(action.type) {
    case INSERT_CHORD:
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: [
            ...state.parts[action.partName].slice(0, action.index),
            state.parts[action.partName][action.index],
            ...state.parts[action.partName].slice(action.index),
          ],
        },
      }
    case REMOVE_CHORD:
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: [
            ...state.parts[action.partName].slice(0, action.index),
            ...state.parts[action.partName].slice(action.index + 1),
          ],
        },
      }
    case REMOVE_PART:
      return {
        ...state,
        structure: [
          ...state.structure.slice(0, action.index),
          ...state.structure.slice(action.index + 1),
        ],
      }
    case SET_CHORD_QUALIFIER:
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: [
            ...state.parts[action.partName].slice(0, action.index),
            {
              ...state.parts[action.partName][action.index],
              qualifier: action.qualifier,
            },
            ...state.parts[action.partName].slice(action.index + 1),
          ],
        },
      }
    case SET_CHORD_DURATION:
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: [
            ...state.parts[action.partName].slice(0, action.index),
            {
              ...state.parts[action.partName][action.index],
              duration: action.duration,
            },
            ...state.parts[action.partName].slice(action.index + 1),
          ],
        },
      }
    case SET_CHORD_ROOT_NOTE:
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: [
            ...state.parts[action.partName].slice(0, action.index),
            {
              ...state.parts[action.partName][action.index],
              degree: helpers.getDegree(action.rootNote, state.key),
            },
            ...state.parts[action.partName].slice(action.index + 1),
          ],
        },
      }
    default:
      return state
  }
}


const undoableChart = (chartSlug) => undoable(chart, {
  // debug: true,
  filter: distinctState(),
  redoType: `REDO/${chartSlug}`,
  undoType: `UNDO/${chartSlug}`,
})


export const charts = (state = {}, action) => Object.keys(state).reduce(
  (nextState, chartSlug) => {
    nextState[chartSlug] = (action.chartSlug && action.chartSlug !== chartSlug) ?
      state[chartSlug] :
      undoableChart(chartSlug)(state[chartSlug], action)
    return nextState
  },
  {},
)


export const editedCharts = (state = {}, action) => {
  switch(action.type) {
    case COMMIT_CHART:
      return {
        ...state,
        [action.chartSlug]: false,
      }
    case EDIT_CHART:
      return {
        ...state,
        [action.chartSlug]: true,
      }
    default:
      return state
  }
}


export const isDevToolsEnabled = (state = false, action) => {
  switch(action.type) {
    case ENABLE_DEV_TOOLS:
      return action.enabled
    default:
      return state
  }
}


export const selections = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_CHORD:
      return {
        ...state,
        [action.chartSlug]: {
          ...state[action.chartSlug],
          index: Math.max(0, action.index - 1),
        },
      }
    case REMOVE_PART:
      return {
        ...state,
        [action.chartSlug]: null,
      }
    case SELECT_CHORD:
      return {
        ...state,
        [action.chartSlug]: {
          index: action.index,
          partName: action.partName,
          type: "chord",
        },
      }
    case SELECT_PART:
      return {
        ...state,
        [action.chartSlug]: {
          index: action.index,
          type: "part",
        },
      }
    default:
      return state
  }
}



// Root reducer


const rootReducer = combineReducers({
  appInfo,
  benchKey,
  charts,
  editedCharts,
  isDevToolsEnabled,
  selections,
})


export default rootReducer
