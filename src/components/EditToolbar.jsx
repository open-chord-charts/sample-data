import KeySelect from "./KeySelect"


const EditToolbar = ({
  chartSlug,
  commitChart,
  editChart,
  edited,
  gitHubBlobUrl,
  selectChordKey,
  redo,
  redoDisabled,
  selectedChord = null,
  undo,
  undoDisabled,
}) => (
  <div style={{marginBottom: 10, marginTop: 10}}>
    <a href={gitHubBlobUrl} style={{textDecoration: "none"}} target="_blank" title="View JSON file"></a>
    {" "}
    {
      edited ? (
        <span>
          <button onClick={() => { commitChart(chartSlug) }}>Commit</button>
          {" "}
          <button disabled={undoDisabled} onClick={undo}>Undo</button>
          <button disabled={redoDisabled} onClick={redo}>Redo</button>
          {" "}
          {
            Object.keys(selectedChord).length ? (
              <KeySelect
                onChange={
                  (value) => {
                    selectChordKey(chartSlug, selectedChord.partName, selectedChord.index, value)
                  }
                }
                value={Object.keys(selectedChord).length ? selectedChord.key : null}
              />
            ) :
            "no chord selected"
          }
        </span>
      ) : (
        <button onClick={() => { editChart(chartSlug) }}>Edit</button>
      )
    }
  </div>
)


export default EditToolbar
