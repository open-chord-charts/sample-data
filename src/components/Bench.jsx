import AutoWidth from "./AutoWidth"
import ChartBench from "../containers/ChartBench"
import DevTools from "../containers/DevTools"
import KeySelect from "./KeySelect"


const getGitHubCommitUrl = (commit) => `https://github.com/openchordcharts/sample-data/commit/${commit}`


const Bench = ({
  charts,
  enableDevTools,
  gitCommitSha,
  initialWidth,
  isDevToolsEnabled,
  lastUpdatedOn,
  packageVersion,
  selectedKey,
  selectKey,
}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <p>
      Version {packageVersion}, last updated on
      {" "}
      <a href={getGitHubCommitUrl(gitCommitSha)}>{lastUpdatedOn}</a>.
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
      Note: add <code>?debug_session=1</code> to keep state in localStorage.
    </p>
    <p>
      This page shows renderings of OpenChordCharts
      {" "}
      <a href="https://github.com/openchordcharts/sample-data">sample JSON files</a>.
    </p>
    <p>
      Current key:
      {" "}
      <KeySelect
        onChange={(value) => { selectKey(value) }}
        value={selectedKey}
      />
    </p>
    <section>
      <h1>Charts</h1>
      <AutoWidth initialWidth={initialWidth}>
        {
          charts.map((chart, idx) => (
            <ChartBench chart={chart} chromaticKey={selectedKey} key={idx} />
          ))
        }
      </AutoWidth>
    </section>
  </div>
)


export default Bench
