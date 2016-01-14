import {connect} from "react-redux"

import * as helpers from "../helpers"
import OneChord from "../components/OneChord"


const mapStateToProps = (state, ownProps) => ({
  rootNote: helpers.getNote(ownProps.degree, state.benchKey),
})

export default connect(mapStateToProps)(OneChord)
