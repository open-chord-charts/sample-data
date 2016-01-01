import {connect} from "react-redux"

import {
  removePart,
} from "../actions"
import * as selectors from "../selectors"
import PartEditToolbar from "../components/PartEditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const selection = selectors.selectionSelector(chartSlug)(state)
  // selection.type === "chord" due to ChartEditToolbar
  const partName = selectors.selectedPartNameSelector(chartSlug)(state)
  return {
    partName,
    selection,
  }
}


const actions = {
  removePart,
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {partName, selection} = stateProps
  const {index} = selection
  const {chartSlug} = ownProps
  return {
    onRemove: () => dispatchProps.removePart(chartSlug, index),
    partName,
  }
}


export default connect(mapStateToProps, actions, mergeProps)(PartEditToolbar)
