import ChartCellSimple from "./ChartCellSimple"
import ChartCellSplitBy2 from "./ChartCellSplitBy2"


const ChartCell = ({chords = null, height, onClick = null, selected, width}) => (
  <td
    onClick={onClick}
    style={{
      borderColor: "#ddd",
      borderStyle: "solid",
      borderWidth: selected ? 3 : 1,
      padding: 0,
      textAlign: chords === null && "center",
      width,
    }}
  >
    {
      chords === null ?
        "–" :
        (
          <svg {...{height, width}}>
            {
              chords.length === 1 ?
                <ChartCellSimple chord={chords[0]} /> :
                <ChartCellSplitBy2 chord1={chords[0]} chord2={chords[1]} {...{height, width}} />
            }
          </svg>
        )
    }
  </td>
)


export default ChartCell
