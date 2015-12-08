import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import Chart from "../components/Chart"
import {commitChart, editChart, redo, removePart, selectChord, undo} from "../actions"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps.chart
  const chart = state.charts.find((chart1) => chart1.data.present.slug === slug)
  return {
    chart: chart.data.present,
    edited: chart.isEdited,
    selectedChord: chart.selectedChord,
    undoDisabled: chart.data.past.length === 0,
    redoDisabled: chart.data.future.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  commitChart,
  editChart,
  redo: redo(ownProps.chart.slug),
  removePart,
  selectChord,
  undo: undo(ownProps.chart.slug),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
