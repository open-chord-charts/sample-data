import ChordQualitySelect from "./ChordQualitySelect"
import DurationInput from "./DurationInput"
import NoteSelect from "./NoteSelect"


const ChordEditToolbar = ({
  chordDuration,
  chordQuality = null,
  chordRootNote,
  onQualityChange,
  onDuplicate,
  onDurationChange,
  onKeyChange,
  onRemove,
}) => (
  <div>
    <NoteSelect
      onChange={(value) => { onKeyChange(value) }}
      title="Root note"
      value={chordRootNote}
    />
    <ChordQualitySelect
      onChange={(value) => { onQualityChange(value) }}
      title="Quality"
      value={chordQuality}
    />
    {" "}
    <DurationInput
      onChange={(value) => { onDurationChange(value) }}
      title="Duration"
      value={chordDuration}
      />
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
