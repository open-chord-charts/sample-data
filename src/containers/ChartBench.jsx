import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import ChartBench from "../components/ChartBench"
import {commitChart, editChart, redo, removeChartPart, undo} from "../actions"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps.chart
  const chart = state.charts.find((chart1) => chart1.present.slug === slug)
  return {
    edited: state.editedChartSlugs.includes(slug),
    undoDisabled: chart.past.length === 0,
    redoDisabled: chart.future.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  commitChart,
  editChart,
  redo: redo(ownProps.chart.slug),
  removeChartPart,
  undo: undo(ownProps.chart.slug),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChartBench)
