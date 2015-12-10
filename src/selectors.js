import {chromaticKeys} from "./model"


export const selectChart = (state, slug) => state.charts.find((chart1) => chart1.data.present.slug === slug)

export const selectChordName = (chord, key) =>
  chromaticKeys[(chromaticKeys.indexOf(key) + chord.degree) % chromaticKeys.length]

export const selectDegreeFromKey = (chordKey, chartKey) =>
  (chromaticKeys.indexOf(chordKey) - chromaticKeys.indexOf(chartKey) + chromaticKeys.length) % chromaticKeys.length


export const selectPresentCharts = (state) => state.charts.map((chart1) => chart1.data.present)

export const selectSelectedChordInChart = (chart) =>
  chart.data.present.parts[chart.selectedChord.partName][chart.selectedChord.index]
