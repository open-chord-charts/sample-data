import {ChartBarSimple} from "./chart-bar-simple"
import {ChartBarSplitBy2} from "./chart-bar-split-by-2"


export const ChartRow = ({partName, bars, height = 60, partNameColumnWidth = 30}) => (
  <tr style={{height}}>
    <td
      style={{
        fontSize: "small",
        fontStyle: "i3talic",
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
            padding: 0,
            verticalAlign: "middle",
          }}
        >
          {
            barChords.length === 1 ?
              <ChartBarSimple chords={barChords} /> :
              <ChartBarSplitBy2 chords={barChords} />
          }
        </td>
      ))
    }
  </tr>
)
