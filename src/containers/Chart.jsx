import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {selectChord, selectPart} from "../actions"
import * as selectors from "../selectors"
import Chart from "../components/Chart"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  const chart = selectors.selectChart(state, slug)
  const presentChartData = selectors.selectPresentChartData(state, slug)
  const rows = selectors.selectRowsFromParts(presentChartData.parts)
  const structureWithRepetitions = selectors.selectStructureWithRepetitions(presentChartData.structure)
  return {
    isEdited: chart.isEdited,
    rows,
    selection: chart.selection,
    structureWithRepetitions,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectChord,
  selectPart,
}, dispatch)

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  rows: stateProps.rows,
  selectChord: stateProps.isEdited ?
    (
      (partName, index) => { dispatchProps.selectChord(ownProps.slug, partName, index) }
    ) :
    null,
  selection: stateProps.selection,
  selectPart: stateProps.isEdited ?
    (
      (index) => { dispatchProps.selectPart(ownProps.slug, index) }
    ) :
    null,
  structureWithRepetitions: stateProps.structureWithRepetitions,
  width: ownProps.width,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chart)
