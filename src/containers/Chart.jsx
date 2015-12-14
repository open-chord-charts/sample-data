import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {commitChart, editChart, redo, selectChord, selectPart, undo} from "../actions"
import * as selectors from "../selectors"
import Chart from "../components/Chart"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  const chart = selectors.selectChart(state, slug)
  const presentChart = selectors.selectPresentChart(state, slug)
  const rows = selectors.selectRowsFromParts(presentChart.parts)
  const structureWithRepetitions = selectors.selectStructureWithRepetitions(presentChart.structure)
  return {
    isSelectionEnabled: chart.isEdited,
    redoDisabled: chart.data.future.length === 0,
    rows,
    selection: chart.selection,
    structureWithRepetitions,
    undoDisabled: chart.data.past.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  commitChart,
  editChart,
  redo: redo(ownProps.slug),
  selectChord, // TODO Check here if selection is enabled instead of passing down isSelectionEnabled prop.
  selectPart,
  undo: undo(ownProps.slug),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
