import {Chart} from "./chart"


export const ChartBench = ({chart, width}) => (
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
