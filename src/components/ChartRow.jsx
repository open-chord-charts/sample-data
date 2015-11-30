const ChartRow = ({children, edited, onRemove, partName, partNameColumnWidth}) => {
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
        {
          edited && (
            <div>
              <button>Add before</button>
              <button onClick={onRemove}>Remove</button>
            </div>
          )
        }
      </td>
      {children}
    </tr>
  )
}


export default ChartRow
