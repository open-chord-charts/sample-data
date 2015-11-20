import {AutoWidth} from "./auto-width"
import {ChartBench} from "./chart-bench"
import {TextChord} from "./chord"
import * as model from "../model"

import {findAllUniqueChordAlterations} from "../model"


const getGitHubCommitUrl = (commit) => `https://github.com/openchordcharts/sample-data/commit/${commit}`

export const Bench = ({charts, chords = null, currentCommit, currentKey, initialWidth, lastUpdatedOn,
  onCurrentKeyChange}) => (
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
      <select onChange={(event) => onCurrentKeyChange(event.target.value)} value={currentKey}>
        {
          model.chromaticKeys.map((key, idx) => (
            <option key={idx} value={key}>{key}</option>
          ))
        }
      </select>
    </p>
    <section>
      <h1>Chords</h1>
      <p>Found in charts, forced in {currentKey} key:</p>
      <ChordsList chords={findAllUniqueChordAlterations(charts)} currentKey={currentKey} />
      {
        chords && (
          <div>
            <p>From chords.json:</p>
            <ChordsList chords={chords} currentKey={currentKey} />
          </div>
        )
      }
    </section>
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
    {chords.map((chord, idx) => <li key={idx}><TextChord chartKey={currentKey} chord={chord} /></li>)}
  </ul>
)
