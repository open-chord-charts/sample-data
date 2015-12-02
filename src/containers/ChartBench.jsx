import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import ChartBench from "../components/ChartBench"
import {commitChart, editChart, removeChartPart} from "../actions"


const mapDispatchToProps = (dispatch) => bindActionCreators({
  commitChart,
  editChart,
  removeChartPart,
}, dispatch)

export default connect(null, mapDispatchToProps)(ChartBench)
