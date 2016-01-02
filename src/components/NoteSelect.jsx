import {CHROMATIC_NOTES} from "../constants"


const NoteSelect = ({onChange, title = null, value}) => (
  <select
    onChange={
      (event) => {
        onChange(event.target.value)
      }
    }
    title={title}
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
