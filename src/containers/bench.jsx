import {connect} from "react-redux"

import {AutoWidth} from "../components/auto-width"
import {ChartBar} from "../components/chart-bar"
import {ChartBench} from "../components/chart-bench"
import {Chord} from "../components/chord"
import {setChartKey} from "../actions"
import * as model from "../model"


const getGitHubCommitUrl = (commit) => `https://github.com/openchordcharts/sample-data/commit/${commit}`

const Bench = ({charts, currentCommit, currentKey, dispatch, initialWidth, lastUpdatedOn}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <p>
      Last updated on
      {" "}
      <a href={getGitHubCommitUrl(currentCommit)}>{lastUpdatedOn}</a>.
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
          dispatch(setChartKey(event.target.value))
        }}
        value={currentKey}
      >
        {
          model.chromaticKeys.map((key, idx) => (
            <option key={idx} value={key}>{key}</option>
          ))
        }
      </select>
    </p>
    <section>
      <h1>Chords</h1>
      <p>These chords were found in charts, deduped and expressed in {currentKey} key:</p>
    </section>
    <ChordsList chords={model.findAllUniqueChordAlterations(charts)} currentKey={currentKey} />
    <section>
      <h1>Charts</h1>
      <AutoWidth initialWidth={initialWidth}>
        {charts.map((chart, idx) => <ChartBench {...{chart, currentKey}} key={idx} />)}
      </AutoWidth>
    </section>
  </div>
)


const ChordsList = ({currentKey, chords}) => (
  <ul>
    {
      chords.map((chord, idx) => (
        <li key={idx}>
          <ChartBar height={40} style={{border: "1px solid #ddd", verticalAlign: "middle"}} width={60}>
            <Chord chartKey={currentKey} chord={chord} />
          </ChartBar>
        </li>
      ))
    }
  </ul>
)


const mapStateToProps = (state) => ({currentKey: state})
export default connect(mapStateToProps)(Bench)
