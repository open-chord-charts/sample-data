import * as model from "../model"
import AutoWidth from "./AutoWidth"
import ChartBench from "./ChartBench"
import ChordsList from "./ChordsList"


const getGitHubCommitUrl = (commit) => `https://github.com/openchordcharts/sample-data/commit/${commit}`


const Bench = ({charts, gitCommitSha, initialWidth, lastUpdatedOn, packageVersion, selectedKey, setSelectedKey}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <p>
      Version {packageVersion}, last updated on
      {" "}
      <a href={getGitHubCommitUrl(gitCommitSha)}>{lastUpdatedOn}</a>.
    </p>
    <p>
      This page shows renderings of OpenChordCharts
      {" "}
      <a href="https://github.com/openchordcharts/sample-data">sample JSON files</a>.
    </p>
    <p>
      Current key:
      {" "}
      <select
        onChange={(event) => {
          setSelectedKey(event.target.value)
        }}
        value={selectedKey}
      >
        {model.chromaticKeys.map((key, idx) => (
          <option key={idx} value={key}>{key}</option>
        ))}
      </select>
    </p>
    <section>
      <h1>Chords</h1>
      <p>These chords were found in charts, deduped and expressed in {selectedKey} key:</p>
    </section>
    <ChordsList chords={model.findAllUniqueChordAlterations(charts)} chromaticKey={selectedKey} />
    <section>
      <h1>Charts</h1>
      <AutoWidth initialWidth={initialWidth}>
        {charts.map((chart, idx) => (
          <ChartBench chart={chart} chromaticKey={selectedKey} key={idx} />
        ))}
      </AutoWidth>
    </section>
  </div>
)


export default Bench
