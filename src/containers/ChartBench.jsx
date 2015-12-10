import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {commitChart, editChart, redo, selectChordKey, undo} from "../actions"
import {selectChart, selectChordName, selectSelectedChordInChart} from "../selectors"
import ChartBench from "../components/ChartBench"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps.chart
  const chart = selectChart(state, slug)
  let {selectedChord} = chart
  if (Object.keys(chart.selectedChord).length) {
    const selectedChordInChart = selectSelectedChordInChart(chart)
    selectedChord = {
      ...selectedChord,
      key: selectChordName(selectedChordInChart, state.selectedKey),
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
