import {Children, cloneElement, Component, PropTypes} from "react"


export default class AutoWidth extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    initialWidth: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props)
    const {initialWidth} = this.props
    this.state = {width: initialWidth}
  }
  componentDidMount() {
    window.onresize = ::this.handleResize
  }
  componentWillUnmount() {
    window.onresize = null
  }
  handleResize() {
    const width = this.refs.wrapperDiv.offsetWidth
    this.setState({width})
  }
  render() {
    const {width} = this.state
    const {children} = this.props
    const clones = Children.map(children, (child) => cloneElement(child, {width}))
    return (
      <div ref="wrapperDiv">
        {clones}
      </div>
    )
  }
}
