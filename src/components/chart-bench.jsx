import {Chart} from "./chart"


const getGitHubBlobUrl = (slug) => `https://github.com/openchordcharts/sample-data/blob/master/data/charts/${slug}.json`


export const ChartBench = ({chart, currentKey, width}) => (
  <article>
    <h1 id={chart.slug}>
      {chart.title}
      {" "}
      <small>
        <a href={"#" + chart.slug} style={{textDecoration: "none"}} title="Anchor"></a>
        {" "}
        <a href={getGitHubBlobUrl(chart.slug)} style={{textDecoration: "none"}} target="_blank" title="View JSON"></a>
      </small>
    </h1>
    {
      // <pre style={{fontSize: "xx-small", height: "20em", overflow: "scroll"}}>
      //   {JSON.stringify(chart, null, 2)}
      // </pre>
    }
    <Chart chart={chart} chartKey={currentKey} width={width} />
  </article>
)
