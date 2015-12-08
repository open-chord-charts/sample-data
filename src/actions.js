import {COMMIT_CHART, EDIT_CHART, REMOVE_CHART_PART, SET_SELECTED_KEY} from "./constants"


export const commitChart = (slug) => ({
  slug,
  type: COMMIT_CHART,
})


export const editChart = (slug) => ({
  slug,
  type: EDIT_CHART,
})


export const removeChartPart = (slug, partIndexInStructure) => ({
  slug,
  partIndexInStructure,
  type: REMOVE_CHART_PART,
})


export const setSelectedKey = (selectedKey) => ({
  selectedKey,
  type: SET_SELECTED_KEY,
})


// Undo

export const redo = (slug) => () => ({type: `REDO/${slug}`})
export const undo = (slug) => () => ({type: `UNDO/${slug}`})
