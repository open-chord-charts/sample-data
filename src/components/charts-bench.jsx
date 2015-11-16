import {AutoWidth} from "./auto-width"
import {ChartBench} from "./chart-bench"


export const ChartsBench = ({charts, width}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <p>
      This page shows renderings of OpenChordCharts
      {" "}
      <a href="https://github.com/openchordcharts/sample-data">sample JSON files</a>.
    </p>
    <AutoWidth initialWidth={width}>
      {charts.map((chart, idx) => <ChartBench chart={chart} key={idx} />)}
    </AutoWidth>
  </div>
)
