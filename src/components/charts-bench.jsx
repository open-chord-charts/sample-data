import {Component, PropTypes} from "react"

import {ChartBench} from "./chart-bench"


export class ChartsBench extends Component {
  static propTypes = {
    charts: PropTypes.arrayOf(PropTypes.object).isRequired,
    width: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props)
    const {width} = this.props
    this.state = {width}
  }
  componentDidMount() {
    window.onresize = this.handleWidthChange
  }
  componentWillUnmount() {
    window.onresize = null
  }
  handleWidthChange = () => {
    const width = this.refs.chartBench.offsetWidth
    this.setState({width})
  }
  render() {
    const {charts} = this.props
    const {width} = this.state
    return (
      <div ref="chartBench">
        <h1>OpenChordCharts bench</h1>
        {charts.map((chart, idx) => <ChartBench chart={chart} key={idx} width={width} />)}
      </div>
    )
  }
}
