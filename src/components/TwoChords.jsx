const TwoChords = ({chord1, chord2, height, width}) => (
  <g>
    <line
      style={{
        stroke: "black",
        strokeWidth: 1,
      }}
      x1={0}
      x2={width}
      y1={height}
      y2={0}
    />
    <text dx="2em" style={{textAnchor: "middle"}} x="0%" y="50%">
      <tspan style={{fontSize: height * 0.8}}>
        {chord1.rootNote}
      </tspan>
      {
        chord1.quality !== "M" && (
          <tspan style={{fontSize: height * 0.5}}>
            {chord1.quality === "m7b5" ? "m7" : chord1.quality}
          </tspan>
        )
      }
    </text>
    {
      chord1.quality === "m7b5" && (
        <text dx="-0.3em" dy="1em" style={{fontSize: height * 0.4, textAnchor: "end"}} x="100%" y="0%">
          b5
        </text>
      )
    }
    <text dx="2em" style={{textAnchor: "middle"}} x="50%" y="50%">
      <tspan style={{fontSize: height * 0.8}}>
        {chord2.rootNote}
      </tspan>
      {
        chord2.quality !== "M" && (
          <tspan style={{fontSize: height * 0.5}}>
            {chord2.quality === "m7b5" ? "m7" : chord2.quality}
          </tspan>
        )
      }
    </text>
    {
      chord2.quality === "m7b5" && (
        <text dx="-0.3em" dy="1em" style={{fontSize: height * 0.4, textAnchor: "end"}} x="100%" y="0%">
          b5
        </text>
      )
    }
  </g>
)


export default TwoChords
