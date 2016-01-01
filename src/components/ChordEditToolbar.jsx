import ChordQualifierSelect from "./ChordQualifierSelect"
import DurationInput from "./DurationInput"
import NoteSelect from "./NoteSelect"


const ChordEditToolbar = ({
  chordDuration,
  chordQualifier = null,
  chordRootNote,
  onQualifierChange,
  onDuplicate,
  onDurationChange,
  onKeyChange,
  onRemove,
}) => (
  <div>
    <NoteSelect
      onChange={(value) => { onKeyChange(value) }}
      value={chordRootNote}
    />
    <ChordQualifierSelect
      onChange={(value) => { onQualifierChange(value) }}
      value={chordQualifier}
    />
    {" "}
    <label>
      duration:
      <DurationInput
        onChange={(value) => { onDurationChange(value) }}
        value={chordDuration}
      />
    </label>
    {" "}
    <button onClick={() => { onRemove() }}>
      Remove
    </button>
    <button onClick={() => { onDuplicate() }}>
      Duplicate
    </button>
  </div>
)


export default ChordEditToolbar
