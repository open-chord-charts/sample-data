import {Component} from 'react'
import {observer} from 'mobx-react'
import {g, line, text, tspan} from 'react-hyperscript-helpers'

@observer
export default class TwoChords extends Component {
  render () {
    const {chord1, chord2, height, width} = this.props
    return g([
      line({
        style: {
          stroke: 'black',
          strokeWidth: 1
        },
        x1: 0,
        x2: width,
        y1: height,
        y2: 0
      }),
      text(
        { dx: '2em', style: { textAnchor: 'middle' }, x: '0%', y: '50%' },
        [
          tspan({style: {fontSize: height * 0.8}}, chord1.rootNote),
          chord1.quality !== 'M' && tspan(
            {style: {fontSize: height * 0.5}},
            chord1.quality === 'm7b5' ? 'm7' : chord1.quality
          )
        ]
      ),
      chord1.quality === 'm7b5' && text(
        { dx: '-0.3em', dy: '1em', style: { fontSize: height * 0.4, textAnchor: 'end' }, x: '100%', y: '0%' },
        'b5'
      ),
      text(
        { dx: '2em', style: { textAnchor: 'middle' }, x: '50%', y: '50%' },
        [
          tspan(
            { style: { fontSize: height * 0.8 } },
            chord2.rootNote
          ),
          chord2.quality !== 'M' && tspan(
            { style: { fontSize: height * 0.5 } },
            chord2.quality === 'm7b5' ? 'm7' : chord2.quality
          )
        ]
      ),
      chord2.quality === 'm7b5' && text(
        {
          dx: '-0.3em',
          dy: '1em',
          style: { fontSize: height * 0.4, textAnchor: 'end' },
          x: '100%',
          y: '0%'
        },
        'b5'
      )
    ])
  }
}
