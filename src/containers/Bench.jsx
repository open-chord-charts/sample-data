import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import Bench from "../components/Bench"
import {setSelectedKey} from "../actions"


const mapStateToProps = (state) => ({
  charts: state.charts.map((chart) => chart.data.present),
  gitCommitSha: state.appInfo.gitCommitSha,
  lastUpdatedOn: state.appInfo.lastUpdatedOn,
  packageVersion: state.appInfo.packageVersion,
  selectedKey: state.selectedKey,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({setSelectedKey}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bench)
