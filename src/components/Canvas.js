import React, { PropTypes, Component } from 'react'
import {Layer, Stage, Image} from 'react-konva'
import {MuiThemeProvider} from 'material-ui/styles'
import {Paper} from 'material-ui'



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
            })
        }
    }
 
    render() {
        const { width, height } = this.props.image
        const style = {
            minHeight: 200,
            padding: 5,
            margin: 12
        }
        return (
            <MuiThemeProvider>
                <Paper style={style}>
                    <Stage width={width} height={height}>
                        <Layer>
                            <Image image={this.state.image} />
                        </Layer>
                    </Stage>
                </Paper>
            </MuiThemeProvider>
      )
    }
}

Canvas.propTypes = {
    image: PropTypes.object.isRequired
}
