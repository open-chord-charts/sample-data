import {ChartBarSimple} from "./chart-bar-simple"
import {ChartBarSplitBy2} from "./chart-bar-split-by-2"


export const ChartRow = ({partName, bars, height = 60, nbBarsByRow = 8, partNameColumnWidth = 30, width = 800}) => {
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
        bars.map((barChords, idx) => (
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
              barChords.length === 1 ?
                <ChartBarSimple chords={barChords} /> :
                <ChartBarSplitBy2 chords={barChords} width={chordColumnWidth} />
            }
          </td>
        ))
      }
    </tr>
  )
}
