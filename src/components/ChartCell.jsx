import ChartBar from "./ChartBar"


const ChartCell = ({children, height, onClick, selected, width}) => {
  return (
    <td
      onClick={onClick}
      style={{
        border: selected ?
          "3px solid #ddd" :
          "1px solid #ddd",
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
