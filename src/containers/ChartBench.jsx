import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import ChartBench from "../components/ChartBench"
import {commitChart, editChart, removeChartPart} from "../actions"


const mapStateToProps = (state, ownProps) => ({
  edited: state.editedChartSlugs.includes(ownProps.chart.slug),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  commitChart,
  editChart,
  removeChartPart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChartBench)
