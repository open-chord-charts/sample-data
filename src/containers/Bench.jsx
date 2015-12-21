import {connect} from "react-redux"

import {enableDevTools, setBenchKey} from "../actions"
import * as helpers from "../helpers"
import * as selectors from "../selectors"
import Bench from "../components/Bench"


const mapStateToProps = (state) => ({
  charts: selectors.presentChartsSelector(state),
  gitHubCommitUrl: helpers.getGitHubCommitUrl(state.appInfo.gitCommitSha),
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
