import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {selectKey} from "../actions"
import * as selectors from "../selectors"
import Bench from "../components/Bench"


const mapStateToProps = (state) => {
  const presentCharts = selectors.selectPresentCharts(state)
  return {
    charts: presentCharts,
    gitCommitSha: state.appInfo.gitCommitSha,
    lastUpdatedOn: state.appInfo.lastUpdatedOn,
    packageVersion: state.appInfo.packageVersion,
    selectedKey: state.selectedKey,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({selectKey}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bench)
