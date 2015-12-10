import {COMMIT_CHART, EDIT_CHART, REMOVE_PART, SELECT_CHORD, SELECT_KEY} from "./constants"


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


export const selectKey = (key) => ({
  key,
  type: SELECT_KEY,
})


// Undo

export const redo = (slug) => () => ({type: `REDO/${slug}`})
export const undo = (slug) => () => ({type: `UNDO/${slug}`})
