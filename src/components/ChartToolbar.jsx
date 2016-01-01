import ChartEditToolbar from "../containers/ChartEditToolbar"


const ChartToolbar = ({
  chartSlug,
  editChart,
  isEdited,
}) => (
  <div style={{marginBottom: 10, marginTop: 10}}>
    {
      isEdited ? (
        <ChartEditToolbar chartSlug={chartSlug} />
      ) : (
        <button onClick={() => { editChart() }}>Edit</button>
      )
    }
  </div>
)


export default ChartToolbar
