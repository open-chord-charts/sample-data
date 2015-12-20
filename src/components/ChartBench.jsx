import {HotKeys} from "react-hotkeys"
import ClipboardButton from "react-clipboard.js"

import Chart from "../containers/Chart"
import EditToolbar from "../containers/EditToolbar"


const ChartBench = ({
  chartJson,
  hotKeysHandlers,
  slug,
  title,
  width,
}) => {
  return (
    <article style={{marginBottom: 60}}>
      <h1 id={slug}>
        <a href={"#" + slug} style={{textDecoration: "none"}} title="Anchor"></a>
        {" "}
        {title}
        <small>
          {" "}
        </small>
      </h1>
      <HotKeys handlers={hotKeysHandlers}>
        <EditToolbar chartSlug={slug} />
        <Chart slug={slug} width={width} />
      </HotKeys>
      <p>
        <ClipboardButton data-clipboard-text={chartJson}>
          Copy JSON
        </ClipboardButton>
      </p>
    </article>
  )
}



export default ChartBench
