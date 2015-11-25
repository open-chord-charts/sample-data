import {chromaticKeys} from "../model"


const renderChordName = (chord, key) =>
  chromaticKeys[(chromaticKeys.indexOf(key) + chord.degree) % chromaticKeys.length]


export const Chord = ({chartKey, chord}) => (
  <tspan>
    <tspan>{renderChordName(chord, chartKey)}</tspan>
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
