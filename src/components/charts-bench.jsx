import {AutoWidth} from "./auto-width"
import {ChartBench} from "./chart-bench"


export const ChartsBench = ({charts, width}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <AutoWidth initialWidth={width}>
      {charts.map((chart, idx) => <ChartBench chart={chart} key={idx} />)}
    </AutoWidth>
  </div>
)
