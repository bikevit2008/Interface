import React, { PropTypes, Component } from 'react'
import {Layer, Stage, Image} from 'react-konva';


export default class Canvas extends Component {
    state = {
        image: null
    }
    componentDidUpdate() {
        const image = new window.Image()
        image.src = this.props.image.file
        image.onload = () => {
            this.setState({
                image: image
            });
        }
    }
 
    render() {
        const { width, height } = this.props.image
        return (
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

Canvas.propTypes = {
    image: PropTypes.object.isRequired
}
