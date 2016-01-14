import OneChord from "../containers/OneChord"
import TwoChords from "../containers/TwoChords"


const ChartCell = ({chords = null, height, onClick = null, selected, width}) => (
  <td
    onClick={onClick}
    style={{
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: selected ? 3 : 1,
      minWidth: width,
      padding: 0,
      textAlign: chords === null ? "center" : null,
    }}
  >
    {
      chords === null ?
        <span style={{fontSize: height * 0.6}}>–</span> :
        (
          <svg height={height} width={width}>
            {
              chords.length === 1 ?
                <OneChord degree={chords[0].degree} height={height} quality={chords[0].quality} /> :
                <TwoChords chord1={chords[0]} chord2={chords[1]} height={height} width={width} />
            }
          </svg>
        )
    }
  </td>
)


export default ChartCell
