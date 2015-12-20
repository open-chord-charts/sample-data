import {createSelector} from "reselect"

import * as helpers from "./helpers"


export const chartsSelector = (state) => state.charts


export const chartSelector = (slug) => createSelector(
  chartsSelector,
  (charts) => charts.find((chart1) => chart1.data.present.slug === slug),
)


export const chartDataSelector = (slug) => createSelector(
  chartSelector(slug),
  (chart) => chart.data,
)


export const presentChartDataSelector = (slug) => createSelector(
  chartDataSelector(slug),
  (chartData) => chartData.present,
)


export const presentChartsDatasSelector = createSelector(
  chartsSelector,
  (charts) => charts.map((chart1) => chart1.data.present),
)


export const chartJsonSelector = (slug) => createSelector(
  presentChartDataSelector(slug),
  (presentChartData) => JSON.stringify(presentChartData, null, 2),
)


export const isEditedSelector = (slug) => createSelector(
  chartSelector(slug),
  (chart) => chart.isEdited,
)


export const selectionSelector = (slug) => createSelector(
  chartSelector(slug),
  (chart) => chart.selection,
)


export const partOfSelectedChordLengthSelector = (slug) => createSelector(
  presentChartDataSelector(slug),
  isEditedSelector(slug),
  selectionSelector(slug),
  (chart, isEdited, selection) => isEdited && selection.type === "chord" ?
    chart.parts[selection.partName].length :
    null
)


export const selectedPartSelector = (slug) => createSelector(
  presentChartDataSelector(slug),
  selectionSelector(slug),
  (presentChartData, selection) => presentChartData.parts[selection.partName]
)


export const selectedChordSelector = (slug) => createSelector(
  selectedPartSelector(slug),
  selectionSelector(slug),
  (selectedPart, selection) => selectedPart[selection.index],
)


export const selectedPartNameSelector = (slug) => createSelector(
  presentChartDataSelector(slug),
  selectionSelector(slug),
  (presentChartData, selection) => presentChartData.structure[selection.index],
)


export const structureWithRepetitionsSelector = (slug) => createSelector(
  presentChartDataSelector(slug),
  (presentChartData) => helpers.getStructureWithRepetitions(presentChartData.structure),
)


export const rowsSelector = (slug) => createSelector(
  presentChartDataSelector(slug),
  (presentChartData) => helpers.getRowsFromParts(presentChartData.parts),
)
