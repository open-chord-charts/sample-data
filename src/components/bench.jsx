import {AutoWidth} from "./auto-width"
import {ChartBench} from "./chart-bench"
import {TextChord} from "./chord"

import {findAllUniqueChordAlterations} from "../model"


export const Bench = ({charts, chords = null, width}) => (
  <div>
    <h1>OpenChordCharts bench</h1>
    <p>
      This page shows renderings of OpenChordCharts
      {" "}
      <a href="https://github.com/openchordcharts/sample-data">sample JSON files</a>.
    </p>
    <section>
      <h1>Chords</h1>
      <p>Found in charts, forced in C key:</p>
      <ChordsList chartKey="C" chords={findAllUniqueChordAlterations(charts)} />
      {
        chords && (
          <div>
            <p>From chords.json:</p>
            <ChordsList chartKey="C" chords={chords} />
          </div>
        )
      }
    </section>
    <section>
      <h1>Charts</h1>
      <AutoWidth initialWidth={width}>
        {charts.map((chart, idx) => <ChartBench chart={chart} key={idx} />)}
      </AutoWidth>
    </section>
  </div>
)


const ChordsList = ({chartKey, chords}) => (
  <ul>
    {chords.map((chord, idx) => <li key={idx}><TextChord {...{chartKey, chord}} /></li>)}
  </ul>
)
