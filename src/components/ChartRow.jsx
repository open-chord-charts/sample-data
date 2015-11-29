const ChartRow = ({children, partName, partNameColumnWidth}) => {
  return (
    <tr>
      <td style={{
        fontSize: "small",
        fontStyle: "italic",
        fontWeight: "bold",
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


export default ChartRow
