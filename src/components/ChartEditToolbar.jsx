import {CHART_PART_NAME_COLUMN_WIDTH} from "../constants"
import ChordEditToolbar from "../containers/ChordEditToolbar"
import PartEditToolbar from "../containers/PartEditToolbar"


const ChartEditToolbar = ({
  chartSlug,
  commitChart,
  redo,
  redoDisabled,
  selectionType = null,
  undo,
  undoDisabled,
}) => (
  <div>
    <div style={{marginBottom: 10, marginLeft: CHART_PART_NAME_COLUMN_WIDTH, marginTop: 10}}>
      <button onClick={() => { commitChart() }}>Commit</button>
      {" "}
      <button disabled={undoDisabled} onClick={() => { undo() }}>Undo</button>
      <button disabled={redoDisabled} onClick={() => { redo() }}>Redo</button>
      {selectionType === null && " Hint: select a chord or a part"}
    </div>
    {
      selectionType === "chord" ? (
        <div style={{marginBottom: 10, marginLeft: CHART_PART_NAME_COLUMN_WIDTH, marginTop: 10}}>
          <ChordEditToolbar chartSlug={chartSlug} />
        </div>
      ) : (
        selectionType === "part" && (
          <div style={{marginBottom: 10, marginLeft: CHART_PART_NAME_COLUMN_WIDTH, marginTop: 10}}>
            <PartEditToolbar chartSlug={chartSlug} />
          </div>
        )
      )
    }
  </div>
)


export default ChartEditToolbar
