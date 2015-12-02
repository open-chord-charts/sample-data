import Chart from "./Chart"


const getGitHubBlobUrl = (slug) => `https://github.com/openchordcharts/sample-data/blob/master/data/charts/${slug}.json`


const ChartBench = ({chart, chromaticKey, commitChart, editChart, removeChartPart, width}) => (
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
        chart.edited ? (
          <button onClick={() => { commitChart(chart.slug) }}>Commit</button>
        ) : (
          <button onClick={() => { editChart(chart.slug) }}>Edit</button>
        )
      }
    </h1>
    <Chart
      {...{chart, chromaticKey, width}}
      onPartRemove={(partIndexInStructure) => {
        removeChartPart(chart.slug, partIndexInStructure)
      }}
    />
  </article>
)


export default ChartBench
