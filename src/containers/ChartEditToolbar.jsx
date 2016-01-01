import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {
  commitChart,
  redo,
  undo,
} from "../actions"
import * as selectors from "../selectors"
import ChartEditToolbar from "../components/ChartEditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const selection = selectors.selectionSelector(chartSlug)(state)
  const chart = selectors.chartSelector(chartSlug)(state)
  return {
    chartSlug,
    redoDisabled: chart.future.length === 0,
    selectionType: selection ? selection.type : null,
    undoDisabled: chart.past.length === 0,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const {chartSlug} = ownProps
  const chartSlugPartial = (action) => (...args) => action(chartSlug, ...args)
  return bindActionCreators(
    {
      commitChart: chartSlugPartial(commitChart),
      redo: chartSlugPartial(redo),
      undo: chartSlugPartial(undo),
    },
    dispatch,
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ChartEditToolbar)
