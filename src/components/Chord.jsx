const Chord = ({qualifier = null, rootNote}) => (
  <tspan>
    <tspan>{rootNote}</tspan>
    {
      qualifier && (
        qualifier === "m7b5" ? (
          <tspan>
            <tspan>m7</tspan>
            <tspan dy="-0.7em">b5</tspan>
          </tspan>
        ) : (
          <tspan>{qualifier}</tspan>
        )
      )
    }
  </tspan>
)


export default Chord
