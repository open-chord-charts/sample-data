import {COMMIT_CHART, EDIT_CHART, REMOVE_PART, SELECT_CHORD, SELECT_KEY} from "./constants"


export const commitChart = (slug) => ({
  slug,
  type: COMMIT_CHART,
})


export const editChart = (slug) => ({
  slug,
  type: EDIT_CHART,
})


export const removePart = (slug, partIndexInStructure) => ({
  slug,
  partIndexInStructure,
  type: REMOVE_PART,
})


export const selectChord = (slug, partName, chordIndex) => ({
  slug,
  partName,
  chordIndex,
  type: SELECT_CHORD,
})


export const selectKey = (selectedKey) => ({
  selectedKey,
  type: SELECT_KEY,
})


// Undo

export const redo = (slug) => () => ({type: `REDO/${slug}`})
export const undo = (slug) => () => ({type: `UNDO/${slug}`})
