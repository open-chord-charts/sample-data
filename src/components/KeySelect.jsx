import * as model from "../model"


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
      model.chromaticKeys.map((key, idx) => (
        <option key={idx} value={key}>{key}</option>
      ))
    }
  </select>
)


export default KeySelect
