import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {
  commitChart,
  editChart,
  insertChord,
  redo,
  removeChord,
  removePart,
  setChordAlterations,
  setChordDuration,
  setChordKey,
  undo,
} from "../actions"
import * as selectors from "../selectors"
import EditToolbar from "../components/EditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const chart = selectors.selectChart(state, chartSlug)
  const {selection} = chart
  let selectedChord = null
  let selectedPart = null
  if (Object.keys(selection).length) {
    switch (selection.type) {
      case "chord":
        const {alterations, degree, duration} = selectors.selectChord(state, chartSlug, selection.partName,
          selection.index)
        const selectedChordKey = selectors.selectKeyFromDegree(degree, state.benchKey)
        selectedChord = {
          ...selection,
          alterations,
          duration,
          key: selectedChordKey,
        }
        break
      case "part":
        const name = selectors.selectPartName(state, chartSlug, selection.index)
        selectedPart = {
          ...selection,
          name,
        }
        break
    }
  }
  const gitHubBlobUrl = selectors.selectGitHubBlobUrl(chartSlug)
  return {
    gitHubBlobUrl,
    edited: chart.isEdited,
    redoDisabled: chart.data.future.length === 0,
    selectedChord,
    selectedPart,
    undoDisabled: chart.data.past.length === 0,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const chartSlugPartial = (action) => (...args) => action(ownProps.chartSlug, ...args)
  return bindActionCreators(
    {
      commitChart: chartSlugPartial(commitChart),
      editChart: chartSlugPartial(editChart),
      insertChord: chartSlugPartial(insertChord),
      redo: chartSlugPartial(redo),
      removeChord: chartSlugPartial(removeChord),
      removePart: chartSlugPartial(removePart),
      setChordAlterations: chartSlugPartial(setChordAlterations),
      setChordDuration: chartSlugPartial(setChordDuration),
      setChordKey: chartSlugPartial(setChordKey),
      undo: chartSlugPartial(undo),
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditToolbar)
