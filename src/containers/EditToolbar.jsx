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
  const {chartSlug} = ownProps
  return bindActionCreators(
    {
      commitChart,
      editChart,
      insertChord,
      redo: redo(chartSlug),
      removeChord,
      removePart,
      setChordAlterations,
      setChordDuration,
      setChordKey,
      undo: undo(chartSlug),
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditToolbar)
