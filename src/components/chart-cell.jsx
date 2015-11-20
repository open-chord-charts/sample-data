export const ChartCell = ({children, height, width}) => (
  <td style={{
    border: "1px solid #ddd",
    height,
    lineHeight: 0,
    minWidth: width,
    padding: 0,
    verticalAlign: "middle",
  }}>
    {children}
  </td>
)
