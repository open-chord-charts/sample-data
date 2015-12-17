import {HotKeys} from "react-hotkeys"

import AutoWidth from "./AutoWidth"
import ChartBench from "../containers/ChartBench"
import DevTools from "../containers/DevTools"
import KeySelect from "./KeySelect"


const keyMap = {
  // Respond to arrows keys and vim-like key shortcuts.
  left: ["left", "h"],
  redo: "ctrl+shift+z",
  right: ["right", "l"],
  undo: "ctrl+z",
}


const Bench = ({
  chartsDatas,
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
      Keyboard shortcuts:
    </p>
    <pre>{JSON.stringify(keyMap, null, 2)}</pre>
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
          chartsDatas.map((chartData, idx) => (
            <ChartBench key={idx} slug={chartData.slug} title={chartData.title} />
          ))
        }
      </AutoWidth>
    </section>
  </HotKeys>
)


export default Bench
