import {
  COMMIT_CHART,
  EDIT_CHART,
  ENABLE_DEV_TOOLS,
  REMOVE_PART,
  SELECT_CHORD,
  SELECT_KEY,
  SELECT_CHORD_KEY,
} from "./constants"


// Bench actions.


export const enableDevTools = (enabled) => ({
  enabled,
  type: ENABLE_DEV_TOOLS,
})


export const selectKey = (key) => ({
  key,
  type: SELECT_KEY,
})


// Chart actions.


export const commitChart = (slug) => ({
  slug,
  type: COMMIT_CHART,
})


export const editChart = (slug) => ({
  slug,
  type: EDIT_CHART,
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


export const selectChordKey = (chartSlug, partName, index, key) => ({
  chartSlug,
  key,
  index,
  partName,
  type: SELECT_CHORD_KEY,
})


// Undo actions.


export const redo = (slug) => () => ({type: `REDO/${slug}`})


export const undo = (slug) => () => ({type: `UNDO/${slug}`})
