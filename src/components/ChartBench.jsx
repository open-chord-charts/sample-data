import {HotKeys} from "react-hotkeys"
import ClipboardButton from "react-clipboard.js"

import Chart from "../containers/Chart"
import ChartToolbar from "../containers/ChartToolbar"


const ChartBench = ({
  chartJson,
  chartJsonUrl,
  hotKeysHandlers,
  slug,
  title,
  width,
}) => (
  <article style={{marginBottom: 60}}>
    <h1 id={slug}>
      <a href={"#" + slug} style={{textDecoration: "none"}} title="Anchor"></a>
      {" "}
      {title}
    </h1>
    <ChartToolbar chartSlug={slug} />
    <HotKeys handlers={hotKeysHandlers}>
      <Chart slug={slug} width={width} />
    </HotKeys>
    <p>
      <a href={chartJsonUrl} style={{textDecoration: "none"}} target="_blank" title="View JSON file"></a>
      {" "}
      <ClipboardButton data-clipboard-text={chartJson}>
        Copy JSON
      </ClipboardButton>
    </p>
  </article>
)


export default ChartBench
