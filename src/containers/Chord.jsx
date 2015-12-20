import {connect} from "react-redux"

import * as helpers from "../helpers"
import Chord from "../components/Chord"


const mapStateToProps = (state, ownProps) => ({
  chordKey: helpers.getKeyFromDegree(ownProps.degree, state.benchKey),
})

export default connect(mapStateToProps)(Chord)
