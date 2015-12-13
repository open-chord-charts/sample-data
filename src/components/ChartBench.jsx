import Chart from "../containers/Chart"
import EditToolbar from "../containers/EditToolbar"


const ChartBench = ({
  chartSlug,
  chartTitle,
  width,
}) => (
  <article style={{marginBottom: 60}}>
    <h1 id={chartSlug}>
      <a href={"#" + chartSlug} style={{textDecoration: "none"}} title="Anchor"></a>
      {" "}
      {chartTitle}
      <small>
        {" "}
      </small>
    </h1>
    <EditToolbar chartSlug={chartSlug} />
    <Chart slug={chartSlug} width={width} />
  </article>
)


export default ChartBench
