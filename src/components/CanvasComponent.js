import React, { PropTypes, Component } from 'react'
import {Layer, Stage, Image} from 'react-konva';


export default class CanvasComponent extends Component {
 state = {
  image: null,
  width: 0,
  height: 0
}
  componentDidUpdate() {
  const image = new window.Image()
  image.src = this.props.file
  image.onload = () => {
    this.setState({
      image: image,
      width: image.width,
      height: image.height
    });
  }
}
 
  render() {
    return <div className='ib page'>
              <Stage width={this.state.width} height={this.state.height}>
                  <Layer>
                    <Image image={this.state.image} />
                  </Layer>
              </Stage>
    </div>
  }
}

CanvasComponent.propTypes = {
  file: PropTypes.object.isRequired
}
