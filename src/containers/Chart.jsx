import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {commitChart, editChart, redo, removePart, selectChord, undo} from "../actions"
import {NB_BARS_BY_ROW} from "../constants"
import * as model from "../model"
import Chart from "../components/Chart"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  const chart = state.charts.find((chart1) => chart1.data.present.slug === slug)
  const presentChart = chart.data.present
  const rows = model.partsToRows(presentChart, NB_BARS_BY_ROW)
  const structureWithRepetitions = model.withRepetitions(presentChart.structure)
  return {
    edited: chart.isEdited,
    nbBarsByRow: NB_BARS_BY_ROW,
    redoDisabled: chart.data.future.length === 0,
    rows,
    selectedChord: chart.selectedChord,
    slug: presentChart.slug,
    structureWithRepetitions,
    undoDisabled: chart.data.past.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  commitChart,
  editChart,
  redo: redo(ownProps.slug),
  removePart,
  selectChord,
  undo: undo(ownProps.slug),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
