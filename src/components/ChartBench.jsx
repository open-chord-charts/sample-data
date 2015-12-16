import {HotKeys} from "react-hotkeys"

import Chart from "../containers/Chart"
import EditToolbar from "../containers/EditToolbar"


const ChartBench = ({
  chordA,
  chordB,
  chordC,
  chordD,
  chordE,
  chordF,
  chordG,
  moveLeft,
  moveRight,
  redo,
  slug,
  title,
  undo,
  width,
}) => (
  <article style={{marginBottom: 60}}>
    <h1 id={slug}>
      <a href={"#" + slug} style={{textDecoration: "none"}} title="Anchor"></a>
      {" "}
      {title}
      <small>
        {" "}
      </small>
    </h1>
    <EditToolbar chartSlug={slug} />
    <HotKeys
      handlers={{
        chordA,
        chordB,
        chordC,
        chordD,
        chordE,
        chordF,
        chordG,
        moveLeft,
        moveRight,
        redo,
        undo,
      }}
    >
      <Chart slug={slug} width={width} />
    </HotKeys>
  </article>
)


export default ChartBench
