import ChartBar from "./ChartBar"


const ChartCell = ({children, height, onClick = null, selected, width}) => {
  return (
    <td
      onClick={onClick}
      style={{
        borderColor: "#ddd",
        borderStyle: "solid",
        borderWidth: selected ? 3 : 1,
        height,
        lineHeight: 0,
        padding: 0,
        textAlign: "center",
        verticalAlign: "middle",
        width,
      }}
    >
      <ChartBar {...{height, width}}>
        {children}
      </ChartBar>
    </td>
  )
}


export default ChartCell
