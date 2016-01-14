const Chord = ({height, quality, rootNote}) => (
  <g>
    <text dy={quality === "m7b5" ? "1.2em" : "1em"} style={{textAnchor: "middle"}} x="50%" y="50%">
      <tspan style={{fontSize: height * 0.8}}>
        {rootNote}
      </tspan>
      {
        quality !== "M" && (
          <tspan style={{fontSize: height * 0.5}}>
            {quality === "m7b5" ? "m7" : quality}
          </tspan>
        )
      }
    </text>
    {
      quality === "m7b5" && (
        <text dx="-0.3em" dy="1em" style={{fontSize: height * 0.4, textAnchor: "end"}} x="100%" y="0%">
          b5
        </text>
      )
    }
  </g>
)


export default Chord
