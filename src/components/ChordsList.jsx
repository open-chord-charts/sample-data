import ChartBar from "./ChartBar"
import Chord from "./Chord"


const ChordsList = ({chromaticKey, chords}) => (
  <ul>
    {chords.map((chord, idx) => (
      <li key={idx}>
        <ChartBar height={40} style={{border: "1px solid #ddd", verticalAlign: "middle"}} width={60}>
          <Chord chord={chord} chromaticKey={chromaticKey} />
        </ChartBar>
      </li>
    ))}
  </ul>
)


export default ChordsList
