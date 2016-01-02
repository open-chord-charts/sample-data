const Chord = ({quality = null, rootNote}) => (
  <tspan>
    <tspan>{rootNote}</tspan>
    {
      quality && (
        quality === "m7b5" ? (
          <tspan>
            <tspan>m7</tspan>
            <tspan dy="-0.7em">b5</tspan>
          </tspan>
        ) : (
          <tspan>{quality}</tspan>
        )
      )
    }
  </tspan>
)


export default Chord
