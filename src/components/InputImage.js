import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {RaisedButton} from 'material-ui'


export default class InputImage extends Component {
    onChangeFileImage(e) {
        var files = e.target.files[0]
        var urlObj = URL.createObjectURL(files)
        const img = new window.Image()
        img.src = urlObj
        img.onload = () => {
            var image = { file: urlObj, width: img.width, height: img.height}
            this.props.setImage(image)
        }
    }
 
    render() {
        const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
}
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton label='Выберите изображение' labelPosition='before' style={styles.button} containerElement='label' >
                        <input type='file' onChange={::this.onChangeFileImage} style={styles.exampleImageInput} />
                    </RaisedButton>
                </MuiThemeProvider>
            </div>
        )
    }
}
