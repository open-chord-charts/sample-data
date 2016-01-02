import {QUALIFIERS} from "../constants"


const ChordQualitySelect = ({onChange, title = null, value}) => (
  <select
    onChange={(event) => { onChange(event.target.value) }}
    title={title}
    value={value}
  >
    {
      QUALIFIERS.map((key, idx) => (
        <option key={idx} value={key}>{key}</option>
      ))
    }
  </select>
)


export default ChordQualitySelect
