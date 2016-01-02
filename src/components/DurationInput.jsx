const DurationInput = ({onChange, title = null, value}) => (
  <input
    min={1}
    onChange={(event) => { onChange(event.target.valueAsNumber) }}
    style={{
      width: "3em",
    }}
    title={title}
    type="number"
    value={value}
  />
)


export default DurationInput
