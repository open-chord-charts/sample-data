import {EDIT_CHART} from "./constants"
import {REMOVE_CHART_PART} from "./constants"
import {SET_SELECTED_KEY} from "./constants"


export const editChart = (chartSlug) => ({
  chartSlug,
  type: EDIT_CHART,
})


export const removeChartPart = (chartSlug, partName) => ({
  chartSlug,
  partName,
  type: REMOVE_CHART_PART,
})


export const setSelectedKey = (selectedKey) => ({
  selectedKey,
  type: SET_SELECTED_KEY,
})
