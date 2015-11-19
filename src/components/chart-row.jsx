import {ChartBarSimple} from "./chart-bar-simple"
import {ChartBarSplitBy2} from "./chart-bar-split-by-2"


export const ChartRow = ({bars, chartKey, height = 60, nbBarsByRow = 8, partName, partNameColumnWidth = 30,
  width = 800}) => {
  const chordColumnWidth = Math.min(
    (width - partNameColumnWidth) / nbBarsByRow,
    height * 1.5,
  )
  return (
    <tr style={{height}}>
      <td
        style={{
          fontSize: "small",
          fontStyle: "italic",
          fontWeight: "bold",
          height,
          lineHeight: 0,
          verticalAlign: "middle",
          width: partNameColumnWidth,
        }}
      >
        {partName}
      </td>
      {
        bars.map((chords, idx) => (
          <td
            key={idx}
            style={{
              border: "1px solid #ddd",
              cursor: "default",
              height,
              lineHeight: 0,
              minWidth: chordColumnWidth,
              padding: 0,
              verticalAlign: "middle",
            }}
          >
            {
              chords.length === 1 ?
                <ChartBarSimple chartKey={chartKey} chords={chords} /> :
                <ChartBarSplitBy2 chartKey={chartKey} chords={chords} width={chordColumnWidth} />
            }
          </td>
        ))
      }
    </tr>
  )
}
