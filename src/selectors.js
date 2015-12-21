import {createSelector} from "reselect"

import * as helpers from "./helpers"


export const chartsSelector = (state) => state.charts


export const chartSelector = (chartSlug) => createSelector(
  chartsSelector,
  (charts) => charts[chartSlug],
)


export const presentChartSelector = (chartSlug) => createSelector(
  chartSelector(chartSlug),
  (chart) => chart.present,
)


export const presentChartsSelector = createSelector(
  chartsSelector,
  (charts) => Object.keys(charts).map((chartSlug) => charts[chartSlug].present),
)


export const chartJsonSelector = (chartSlug) => createSelector(
  presentChartSelector(chartSlug),
  (presentChart) => JSON.stringify(presentChart, null, 2),
)


export const isEditedSelector = (chartSlug) => (state) => state.editedCharts[chartSlug]


export const selectionSelector = (chartSlug) => (state) => state.selections[chartSlug]


export const partOfSelectedChordLengthSelector = (chartSlug) => createSelector(
  presentChartSelector(chartSlug),
  selectionSelector(chartSlug),
  (chart, selection) => selection && selection.type === "chord" ?
    chart.parts[selection.partName].length :
    null
)


export const selectedPartSelector = (chartSlug) => createSelector(
  presentChartSelector(chartSlug),
  selectionSelector(chartSlug),
  (presentChart, selection) => presentChart.parts[selection.partName]
)


export const selectedChordSelector = (chartSlug) => createSelector(
  selectedPartSelector(chartSlug),
  selectionSelector(chartSlug),
  (selectedPart, selection) => selectedPart[selection.index],
)


export const selectedPartNameSelector = (chartSlug) => createSelector(
  presentChartSelector(chartSlug),
  selectionSelector(chartSlug),
  (presentChart, selection) => presentChart.structure[selection.index],
)


export const structureWithRepetitionsSelector = (chartSlug) => createSelector(
  presentChartSelector(chartSlug),
  (presentChart) => helpers.getStructureWithRepetitions(presentChart.structure),
)


export const rowsSelector = (chartSlug) => createSelector(
  presentChartSelector(chartSlug),
  (presentChart) => helpers.getRowsFromParts(presentChart.parts),
)
