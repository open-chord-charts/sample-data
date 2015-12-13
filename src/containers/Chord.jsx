import {connect} from "react-redux"

import * as selectors from "../selectors"
import Chord from "../components/Chord"


const mapStateToProps = (state, ownProps) => ({
  chordKey: selectors.selectKeyFromDegree(ownProps.degree, state.selectedKey),
})

export default connect(mapStateToProps)(Chord)
