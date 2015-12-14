import {CHART_PART_NAME_COLUMN_WIDTH} from "../constants"


const ChartRow = ({
  children,
  onPartNameClick = null,
  partName,
  partNameColumnWidth = CHART_PART_NAME_COLUMN_WIDTH,
}) => {
  return (
    <tr>
      <td
        onClick={onPartNameClick}
        style={{
          fontSize: "small",
          fontStyle: "italic",
          fontWeight: "bold",
          lineHeight: 0,
          verticalAlign: "middle",
          width: partNameColumnWidth,
        }}
      >
        {partName}
      </td>
      {children}
    </tr>
  )
}


export default ChartRow
