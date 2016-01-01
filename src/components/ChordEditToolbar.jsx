import AlterationSelect from "./AlterationSelect"
import DurationInput from "./DurationInput"
import KeySelect from "./KeySelect"


const ChordEditToolbar = ({
  chordAlterations = null,
  chordDuration,
  chordKey,
  onAlterationsChange,
  onDuplicate,
  onDurationChange,
  onKeyChange,
  onRemove,
}) => (
  <div>
    <KeySelect
      onChange={(value) => { onKeyChange(value) }}
      value={chordKey}
    />
    <AlterationSelect
      onChange={(value) => { onAlterationsChange(value) }}
      value={chordAlterations ? chordAlterations[0] : null}
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
