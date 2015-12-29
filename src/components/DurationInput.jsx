const DurationInput = ({onChange, value}) => (
  <input
    min={1}
    onChange={(event) => { onChange(event.target.valueAsNumber) }}
    style={{
      width: "3em",
    }}
    type="number"
    value={value}
  />
)


export default DurationInput
