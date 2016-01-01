import {CHROMATIC_NOTES} from "../constants"


const NoteSelect = ({onChange, value}) => (
  <select
    onChange={
      (event) => {
        onChange(event.target.value)
      }
    }
    value={value}
  >
    {
      CHROMATIC_NOTES.map((key, idx) => (
        <option key={idx} value={key}>{key}</option>
      ))
    }
  </select>
)


export default NoteSelect
