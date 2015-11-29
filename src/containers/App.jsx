import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import Bench from "../components/Bench"
import {setSelectedKey} from "../actions"


const mapStateToProps = ({selectedKey}) => ({selectedKey})
const mapDispatchToProps = (dispatch) => bindActionCreators({setSelectedKey}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bench)
