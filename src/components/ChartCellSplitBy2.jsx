import Chord from "../containers/Chord"


const ChartCellSplitBy2 = ({chord1, chord2, height, padding = 10, width}) => (
  <g>
    <line
      style={{
        stroke: "#ddd",
        strokeWidth: 1,
      }}
      x1={0}
      x2={width}
      y1={height}
      y2={0}
    />
    <text style={{textAnchor: "start"}} x={padding} y={25}>
      <Chord degree={chord1.degree} quality={chord1.quality} />
    </text>
    <text style={{textAnchor: "end"}} x={width - padding} y={50}>
      <Chord degree={chord2.degree} quality={chord2.quality} />
    </text>
  </g>
)


export default ChartCellSplitBy2
