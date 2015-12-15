import {connect} from "react-redux"

import {enableDevTools, setBenchKey} from "../actions"
import * as selectors from "../selectors"
import Bench from "../components/Bench"


const mapStateToProps = (state) => ({
  chartsDatas: selectors.selectPresentChartsDatas(state),
  gitHubCommitUrl: selectors.selectGitHubCommitUrl(state.appInfo.gitCommitSha),
  isDevToolsEnabled: state.isDevToolsEnabled,
  lastUpdatedOn: state.appInfo.lastUpdatedOn,
  packageVersion: state.appInfo.packageVersion,
  benchKey: state.benchKey,
})

const actions = {
  enableDevTools,
  setBenchKey,
}

export default connect(mapStateToProps, actions)(Bench)
