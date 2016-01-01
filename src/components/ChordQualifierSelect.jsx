import {QUALIFIERS} from "../constants"


const ChordQualifierSelect = ({onChange, value = null}) => (
  <select
    onChange={
      (event) => {
        let targetValue = event.target.value
        if (targetValue === "") {
          targetValue = null
        }
        onChange(targetValue)
      }
    }
    value={value === null ? "" : value}
  >
    <option value="">-</option>
    {
      QUALIFIERS.map((key, idx) => (
        <option key={idx} value={key}>{key}</option>
      ))
    }
  </select>
)


export default ChordQualifierSelect
