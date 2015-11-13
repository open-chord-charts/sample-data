import ReactDOM from "react-dom"

import {Chart} from "./components/chart"
import chartsData from "./charts-data"


const ChartBench = ({chart}) => (
  <section>
    <h1 id={chart.title}>
      {chart.title}
      {" "}
      <small>
        <a href={"#" + chart.title}>#</a>
      </small>
    </h1>
    <pre style={{fontSize: "xx-small", height: "20em", overflow: "scroll"}}>
      {JSON.stringify(chart, null, 2)}
    </pre>
    <Chart chart={chart} />
    <hr />
  </section>
)


const ChartsBench = () => (
  <div>
    <h1>OpenChordCharts bench</h1>
    {chartsData.map((chart, idx) => <ChartBench chart={chart} key={idx} />)}
  </div>
)


export const init = (node) => ReactDOM.render(<ChartsBench />, node)
