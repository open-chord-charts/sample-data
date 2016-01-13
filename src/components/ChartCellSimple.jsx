import Chord from "../containers/Chord"


const ChartCellSimple = ({chord}) => (
  <text dy="0.3em" style={{textAnchor: "middle"}} x="50%" y="50%">
    <Chord degree={chord.degree} quality={chord.quality} />
  </text>
)


export default ChartCellSimple
