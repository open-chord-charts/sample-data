import {CHART_PART_NAME_COLUMN_WIDTH} from "../constants"


const ChartRow = ({
  children,
  height,
  isRepetitedPart,
  onPartNameClick = null,
  partName,
  partNameColumnWidth = CHART_PART_NAME_COLUMN_WIDTH,
}) => (
  <tr
    style={{
      height: isRepetitedPart ? height / 2 : height,
      lineHeight: 0,
    }}
  >
    <td
      onClick={onPartNameClick}
      style={{
        fontSize: "small",
        fontStyle: "italic",
        fontWeight: "bold",
        verticalAlign: "middle",
        width: partNameColumnWidth,
      }}
    >
      {partName}
    </td>
    {children}
  </tr>
)


export default ChartRow
