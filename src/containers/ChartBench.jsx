import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {commitChart, editChart, redo, selectChordKey, undo} from "../actions"
import * as selectors from "../selectors"
import ChartBench from "../components/ChartBench"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps.chart
  const chart = selectors.selectChart(state, slug)
  let {selectedChord} = chart
  if (Object.keys(chart.selectedChord).length) {
    const {degree} = selectors.selectChord(state, slug, selectedChord.partName, selectedChord.index)
    const selectedChordKey = selectors.selectKeyFromDegree(degree, state.selectedKey)
    selectedChord = {
      ...selectedChord,
      key: selectedChordKey,
    }
  }
  return {
    edited: chart.isEdited,
    redoDisabled: chart.data.future.length === 0,
    selectedChord,
    undoDisabled: chart.data.past.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {slug} = ownProps.chart
  return bindActionCreators(
    {
      commitChart,
      editChart,
      redo: redo(slug),
      selectChordKey,
      undo: undo(slug),
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartBench)
