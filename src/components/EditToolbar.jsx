import ClipboardButton from "react-clipboard.js"

import AlterationSelect from "./AlterationSelect"
import DurationInput from "./DurationInput"
import KeySelect from "./KeySelect"


const EditToolbar = ({
  chartJSON,
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
    <ClipboardButton data-clipboard-text={chartJSON}>
      Copy JSON
    </ClipboardButton>
    {" "}
    {
      edited ? (
        <span>
          <button onClick={commitChart}>Commit</button>
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
                      setChordKey(selectedChord.partName, selectedChord.index, value)
                    }
                  }
                  value={selectedChord ? selectedChord.key : null}
                />
                <AlterationSelect
                  onChange={
                    (value) => {
                      setChordAlterations(selectedChord.partName, selectedChord.index, value)
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
                        setChordDuration(selectedChord.partName, selectedChord.index, value)
                      }
                    }
                    value={selectedChord.duration}
                  />
                </label>
                {" "}
                <button onClick={() => removeChord(selectedChord.partName, selectedChord.index)}>
                  Remove
                </button>
                <button onClick={() => insertChord(selectedChord.partName, selectedChord.index)}>
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
                <button onClick={() => { removePart(selectedPart.index) }}>Remove</button>
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
        <button onClick={editChart}>Edit</button>
      )
    }
  </div>
)


export default EditToolbar
