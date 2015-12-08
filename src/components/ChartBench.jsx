import Chart from "../containers/Chart"


const getGitHubBlobUrl = (slug) => `https://github.com/openchordcharts/sample-data/blob/master/data/charts/${slug}.json`


const ChartBench = ({
  chart,
  chromaticKey,
  commitChart,
  editChart,
  edited,
  redo,
  redoDisabled,
  undo,
  undoDisabled,
  width,
}) => (
  <article>
    <h1 id={chart.slug}>
      {chart.title}
      {" "}
      <small>
        <a href={"#" + chart.slug} style={{textDecoration: "none"}} title="Anchor"></a>
        {" "}
        <a href={getGitHubBlobUrl(chart.slug)} style={{textDecoration: "none"}} target="_blank" title="View JSON file">
          
        </a>
      </small>
      {" "}
      {
        edited ? (
          <span>
            <button onClick={() => { commitChart(chart.slug) }}>Commit</button>
            <button disabled={undoDisabled} onClick={undo}>Undo</button>
            <button disabled={redoDisabled} onClick={redo}>Redo</button>
          </span>
        ) : (
          <button onClick={() => { editChart(chart.slug) }}>Edit</button>
        )
      }
    </h1>
    <Chart {...{chart, chromaticKey, edited, width}} />
  </article>
)


export default ChartBench
