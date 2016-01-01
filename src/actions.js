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
  SET_CHORD_ROOT_NOTE,
  SET_CHORD_QUALIFIER,
} from "./constants"


// Bench actions.


export const enableDevTools = (enabled) => ({
  enabled,
  type: ENABLE_DEV_TOOLS,
})


export const setBenchKey = (key) => ({
  key,
  type: SET_BENCH_KEY,
})


// Chart actions.


export const commitChart = (chartSlug) => ({
  chartSlug,
  type: COMMIT_CHART,
})


export const editChart = (chartSlug) => ({
  chartSlug,
  type: EDIT_CHART,
})


export const insertChord = (chartSlug, partName, index) => ({
  chartSlug,
  index,
  partName,
  type: INSERT_CHORD,
})


export const removeChord = (chartSlug, partName, index) => ({
  chartSlug,
  index,
  partName,
  type: REMOVE_CHORD,
})


export const removePart = (chartSlug, index) => ({
  chartSlug,
  index,
  type: REMOVE_PART,
})


export const selectChord = (chartSlug, partName, index) => ({
  chartSlug,
  partName,
  index,
  type: SELECT_CHORD,
})


export const selectPart = (chartSlug, index) => ({
  chartSlug,
  index,
  type: SELECT_PART,
})


export const setChordQualifier = (chartSlug, partName, index, qualifier) => ({
  chartSlug,
  index,
  partName,
  qualifier,
  type: SET_CHORD_QUALIFIER,
})


export const setChordDuration = (chartSlug, partName, index, duration) => ({
  chartSlug,
  duration,
  index,
  partName,
  type: SET_CHORD_DURATION,
})


export const setChordRootNote = (chartSlug, partName, index, rootNote) => ({
  chartSlug,
  index,
  partName,
  rootNote,
  type: SET_CHORD_ROOT_NOTE,
})


// Undo actions.


export const redo = (chartSlug) => ({type: `REDO/${chartSlug}`})


export const undo = (chartSlug) => ({type: `UNDO/${chartSlug}`})
