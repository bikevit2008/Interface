import React, { PropTypes, Component } from 'react'
import {Layer, Stage, Image} from 'react-konva';


export default class CanvasComponent extends Component {
 state = {
  image: null
}
  componentDidUpdate() {
  const image = new window.Image()
  image.src = this.props.file
  image.onload = () => {
    this.setState({
      image: image
    });
  }
}
 
    render() {
        const { width, height } = this.props
        return(
            <div>
                  <Stage width={width} height={height}>
                      <Layer>
                        <Image image={this.state.image} />
                      </Layer>
                  </Stage>
            </div>
        )
    }
}

CanvasComponent.propTypes = {
    file: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}
