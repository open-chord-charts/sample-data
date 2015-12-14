import AlterationSelect from "./AlterationSelect"
import DurationInput from "./DurationInput"
import KeySelect from "./KeySelect"


const EditToolbar = ({
  chartSlug,
  commitChart,
  editChart,
  edited,
  gitHubBlobUrl,
  insertChord,
  redo,
  redoDisabled,
  removeChord,
  removePart,
  selectedChord = null,
  selectedPart = null,
  setChordAlterations,
  setChordDuration,
  setChordKey,
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
            selectedChord && (
              <span>
                {"Selected: chord"}
                {" "}
                <KeySelect
                  onChange={
                    (value) => {
                      setChordKey(chartSlug, selectedChord.partName, selectedChord.index, value)
                    }
                  }
                  value={selectedChord ? selectedChord.key : null}
                />
                <AlterationSelect
                  onChange={
                    (value) => {
                      setChordAlterations(chartSlug, selectedChord.partName, selectedChord.index, value)
                    }
                  }
                  value={
                    selectedChord && selectedChord.alterations && selectedChord.alterations.length ?
                      selectedChord.alterations[0] :
                      ""
                  }
                />
                {" "}
                <label>
                  duration:
                  <DurationInput
                    onChange={
                      (value) => {
                        setChordDuration(chartSlug, selectedChord.partName, selectedChord.index, value)
                      }
                    }
                    value={selectedChord.duration}
                  />
                </label>
                {" "}
                <button onClick={() => removeChord(chartSlug, selectedChord.partName, selectedChord.index)}>
                  Remove
                </button>
                <button onClick={() => insertChord(chartSlug, selectedChord.partName, selectedChord.index)}>
                  Duplicate
                </button>
              </span>
            )
          }
          {
            selectedPart && (
              <span>
                {`Selected: part ${selectedPart.name}`}
                {" "}
                <button onClick={() => { removePart(chartSlug, selectedPart.index) }}>Remove</button>
              </span>
            )
          }
          {
            !(selectedChord || selectedPart) && (
              "Hint: select a chord or a part"
            )
          }
        </span>
      ) : (
        <button onClick={() => { editChart(chartSlug) }}>Edit</button>
      )
    }
  </div>
)


export default EditToolbar
