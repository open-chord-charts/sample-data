import {chromaticKeys} from "../model"


// TODO Use container for this.
const renderChordName = (degree, key) =>
  chromaticKeys[(chromaticKeys.indexOf(key) + degree) % chromaticKeys.length]


const Chord = ({chord, chromaticKey}) => (
  <tspan>
    <tspan>{renderChordName(chord.degree, chromaticKey)}</tspan>
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
