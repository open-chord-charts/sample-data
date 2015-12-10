import {CHROMATIC_KEYS} from "../constants"


const KeySelect = ({onChange, value}) => (
  <select
    onChange={
      (event) => {
        onChange(event.target.value)
      }
    }
    value={value}
  >
    {
      CHROMATIC_KEYS.map((key, idx) => (
        <option key={idx} value={key}>{key}</option>
      ))
    }
  </select>
)


export default KeySelect
