import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"

import {selectChord, selectPart} from "../actions"
import * as selectors from "../selectors"
import Chart from "../components/Chart"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  return createStructuredSelector({
    isEdited: selectors.isEditedSelector(slug),
    rows: selectors.rowsSelector(slug),
    selection: selectors.selectionSelector(slug),
    structureWithRepetitions: selectors.structureWithRepetitionsSelector(slug),
  })(state)
}


const actions = {
  selectChord,
  selectPart,
}


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


export default connect(mapStateToProps, actions, mergeProps)(Chart)
