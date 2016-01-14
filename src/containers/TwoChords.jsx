import {connect} from "react-redux"

import * as helpers from "../helpers"
import TwoChords from "../components/TwoChords"


const mapStateToProps = (state, ownProps) => ({
  chord1: {
    ...ownProps.chord1,
    rootNote: helpers.getNote(ownProps.chord1.degree, state.benchKey),
  },
  chord2: {
    ...ownProps.chord2,
    rootNote: helpers.getNote(ownProps.chord2.degree, state.benchKey),
  },
})

export default connect(mapStateToProps)(TwoChords)
