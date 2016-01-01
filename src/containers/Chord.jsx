import {connect} from "react-redux"

import * as helpers from "../helpers"
import Chord from "../components/Chord"


const mapStateToProps = (state, ownProps) => ({
  rootNote: helpers.getNote(ownProps.degree, state.benchKey),
})

export default connect(mapStateToProps)(Chord)
