export const ChartRow = ({children, height, partName, partNameColumnWidth}) => {
  return (
    <tr style={{height}}>
      <td style={{
        fontSize: "small",
        fontStyle: "italic",
        fontWeight: "bold",
        height,
        lineHeight: 0,
        verticalAlign: "middle",
        width: partNameColumnWidth,
      }}>
        {partName}
      </td>
      {children}
    </tr>
  )
}
