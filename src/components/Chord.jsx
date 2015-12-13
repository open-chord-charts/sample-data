const Chord = ({alterations = null, chordKey}) => (
  <tspan>
    <tspan>{chordKey}</tspan>
    {
      alterations && alterations.map((alteration, idx) => (
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
