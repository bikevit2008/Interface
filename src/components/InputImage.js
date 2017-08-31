import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {RaisedButton} from 'material-ui'

function createObjectURL ( file ) {
    if ( window.webkitURL ) {
        return window.webkitURL.createObjectURL( file )
    } else if ( window.URL && window.URL.createObjectURL ) {
        return window.URL.createObjectURL( file )
    } else {
        return null
    }
}


export default class InputImage extends Component {
    onChangeFileImage(e) {
        var file = e.target.files[0]
        var urlObj = createObjectURL(file)
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
