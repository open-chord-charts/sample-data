import {chromaticKeys} from "../model"


const renderChordName = (chord, key) =>
  chromaticKeys[(chromaticKeys.indexOf(key) + chord.degree) % chromaticKeys.length]


const Chord = ({chord, chromaticKey}) => (
  <tspan>
    <tspan>{renderChordName(chord, chromaticKey)}</tspan>
    {
      chord.alterations && chord.alterations.map((alteration, idx) => (
        <tspan key={idx}>
          {
            alteration === "b5" ?
              <tspan dy="-0.7em">{alteration}</tspan> :
              alteration
          }
        </tspan>
      ))
    }
  </tspan>
)


export default Chord
