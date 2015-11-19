import {TextChord} from "./chord"


export const ChartBarSimple = ({chartKey, chords, width}) => (
  <div style={{textAlign: "center", width}}>
    <TextChord chartKey={chartKey} chord={chords[0]} />
  </div>
)
