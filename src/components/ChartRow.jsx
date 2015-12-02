const ChartRow = ({children, edited, onRemove, partName, partNameColumnWidth}) => {
  return (
    <tr>
      {
        edited && (
          <td style={{paddingRight: "1em"}}>
            <button onClick={onRemove}>Remove</button>
          </td>
        )
      }
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
