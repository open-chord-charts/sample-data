import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {commitChart, editChart, redo, selectChordKey, undo} from "../actions"
import * as selectors from "../selectors"
import EditToolbar from "../components/EditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const chart = selectors.selectChart(state, chartSlug)
  let {selectedChord} = chart
  if (Object.keys(chart.selectedChord).length) {
    const {degree} = selectors.selectChord(state, chartSlug, selectedChord.partName, selectedChord.index)
    const selectedChordKey = selectors.selectKeyFromDegree(degree, state.selectedKey)
    selectedChord = {
      ...selectedChord,
      key: selectedChordKey,
    }
  }
  const gitHubBlobUrl = selectors.selectGitHubBlobUrl(chartSlug)
  return {
    edited: chart.isEdited,
    gitHubBlobUrl,
    redoDisabled: chart.data.future.length === 0,
    selectedChord,
    undoDisabled: chart.data.past.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {chartSlug} = ownProps
  return bindActionCreators(
    {
      commitChart,
      editChart,
      redo: redo(chartSlug),
      selectChordKey,
      undo: undo(chartSlug),
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditToolbar)
