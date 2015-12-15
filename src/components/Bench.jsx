import AutoWidth from "./AutoWidth"
import ChartBench from "../components/ChartBench"
import DevTools from "../containers/DevTools"
import KeySelect from "./KeySelect"


const Bench = ({
  charts,
  enableDevTools,
  gitHubCommitUrl,
  initialWidth,
  isDevToolsEnabled,
  lastUpdatedOn,
  packageVersion,
  benchKey,
  setBenchKey,
}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <p>
      This page shows renderings of OpenChordCharts
      {" "}
      <a href="https://github.com/openchordcharts/sample-data">sample JSON files</a>.
    </p>
    <p>
      Version {packageVersion}, last updated on
      {" "}
      <a href={gitHubCommitUrl}>{lastUpdatedOn}</a>.
    </p>
    <p>
      <label>
        <input
          checked={isDevToolsEnabled}
          onChange={(event) => enableDevTools(event.target.checked)}
          type="checkbox"
        />
        Enable redux dev-tools.
      </label>
    </p>
    {isDevToolsEnabled && <DevTools />}
    <p>
      Note: add <code><a href="?debug_session=1">?debug_session=1</a></code> to URL to keep state in localStorage.
    </p>
    <p>
      Current key:
      {" "}
      <KeySelect
        onChange={(value) => { setBenchKey(value) }}
        value={benchKey}
      />
    </p>
    <section>
      <AutoWidth initialWidth={initialWidth}>
        {
          charts.map((chart, idx) => (
            <ChartBench chartSlug={chart.slug} chartTitle={chart.title} key={idx} />
          ))
        }
      </AutoWidth>
    </section>
  </div>
)


export default Bench
