import Chart from "./Chart"


const getGitHubBlobUrl = (slug) => `https://github.com/openchordcharts/sample-data/blob/master/data/charts/${slug}.json`


const ChartBench = ({chart, chromaticKey, width}) => (
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
    </h1>
    <Chart {...{chart, chromaticKey, width}} />
  </article>
)


export default ChartBench
