import Visualizer from 'webpack-visualizer-plugin'
import webpack from 'webpack'

export default {
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react' // For babel JSX transformation which generates React.createElement.
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new Visualizer()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
