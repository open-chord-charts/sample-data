import {COMMIT_CHART, EDIT_CHART, REMOVE_CHART_PART, SET_SELECTED_KEY} from "./constants"


export const commitChart = (chartSlug) => ({
  chartSlug,
  type: COMMIT_CHART,
})


export const editChart = (chartSlug) => ({
  chartSlug,
  type: EDIT_CHART,
})


export const removeChartPart = (chartSlug, partIndexInStructure) => ({
  chartSlug,
  partIndexInStructure,
  type: REMOVE_CHART_PART,
})


export const setSelectedKey = (selectedKey) => ({
  selectedKey,
  type: SET_SELECTED_KEY,
})
