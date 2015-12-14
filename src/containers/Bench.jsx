import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {enableDevTools, setBenchKey} from "../actions"
import * as selectors from "../selectors"
import Bench from "../components/Bench"


const mapStateToProps = (state) => ({
  charts: selectors.selectPresentCharts(state),
  gitHubCommitUrl: selectors.selectGitHubCommitUrl(state.appInfo.gitCommitSha),
  isDevToolsEnabled: state.isDevToolsEnabled,
  lastUpdatedOn: state.appInfo.lastUpdatedOn,
  packageVersion: state.appInfo.packageVersion,
  benchKey: state.benchKey,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  enableDevTools,
  setBenchKey,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bench)
