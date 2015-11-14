import {Component, PropTypes} from "react"
import {render} from "react-dom"

import {Chart} from "./components/chart"
import charts from "./charts-data"


const ChartBench = ({chart, width}) => (
  <section>
    <h1 id={chart.title}>
      {chart.title}
      {" "}
      <small>
        <a href={"#" + chart.title}>#</a>
      </small>
    </h1>
    {
      // <pre style={{fontSize: "xx-small", height: "20em", overflow: "scroll"}}>
      //   {JSON.stringify(chart, null, 2)}
      // </pre>
    }
    <Chart chart={chart} width={width} />
  </section>
)


class ChartsBench extends Component {
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


export const init = (node) => {
  const width = node.offsetWidth
  render(<ChartsBench charts={charts} width={width} />, node)
}
