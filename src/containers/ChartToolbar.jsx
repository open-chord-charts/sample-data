import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {editChart} from "../actions"
import * as selectors from "../selectors"
import ChartToolbar from "../components/ChartToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  return {
    chartSlug,
    isEdited: selectors.isEditedSelector(chartSlug)(state),
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const {chartSlug} = ownProps
  return bindActionCreators(
    {
      editChart: () => editChart(chartSlug),
    },
    dispatch,
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ChartToolbar)
