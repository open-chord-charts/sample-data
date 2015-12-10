import * as selectors from "../selectors"


const Chord = ({alterations, chartKey, degree}) => (
  <tspan>
    <tspan>{selectors.selectKeyFromDegree(degree, chartKey)}</tspan>
    {
      alterations && alterations.map((alteration, idx) => (
        <tspan key={idx}>
          {
            alteration === "b5" ?
              <tspan dy="-0.7em">{alteration}</tspan> :
              alteration
          }
        </tspan>
      ))
    }
  </tspan>
)


export default Chord
