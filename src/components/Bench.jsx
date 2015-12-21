import {HotKeys} from "react-hotkeys"

import AutoWidth from "./AutoWidth"
import ChartBench from "../containers/ChartBench"
import DevTools from "../containers/DevTools"
import KeySelect from "./KeySelect"


const keyMap = {
  commit: "ctrl+enter",
  left: ["left", "h"],
  redo: "ctrl+shift+z",
  right: ["right", "l"],
  undo: "ctrl+z",
}


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
  <HotKeys keyMap={keyMap}>
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
            <ChartBench key={idx} slug={chart.slug} title={chart.title} />
          ))
        }
      </AutoWidth>
    </section>
  </HotKeys>
)


export default Bench
