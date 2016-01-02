const Chord = ({quality, rootNote}) => (
  <tspan>
    <tspan>{rootNote}</tspan>
    {
      quality === "m7b5" ? (
        <tspan>
          <tspan>m7</tspan>
          <tspan dy="-0.7em">b5</tspan>
        </tspan>
      ) : (
        quality !== "M" && (
          <tspan>{quality}</tspan>
        )
      )
    }
  </tspan>
)


export default Chord
