const PartEditToolbar = ({
  onRemove,
  partName,
}) => (
  <div>
    <input
      onChange={(value) => { console.log("TODO", value) }}
      style={{
        width: "3em",
      }}
      type="text"
      value={partName}
    />
    <button onClick={() => { onRemove() }}>Remove</button>
  </div>
)


export default PartEditToolbar
