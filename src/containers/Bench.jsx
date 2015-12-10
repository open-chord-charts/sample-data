import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {selectPresentCharts} from "../selectors"
import {selectKey} from "../actions"
import * as model from "../model"
import Bench from "../components/Bench"


const mapStateToProps = (state) => {
  const presentCharts = selectPresentCharts(state)
  const uniqueChords = model.findUniqueChords(presentCharts)
  return {
    charts: presentCharts,
    gitCommitSha: state.appInfo.gitCommitSha,
    lastUpdatedOn: state.appInfo.lastUpdatedOn,
    packageVersion: state.appInfo.packageVersion,
    uniqueChords,
    selectedKey: state.selectedKey,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({selectKey}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bench)
