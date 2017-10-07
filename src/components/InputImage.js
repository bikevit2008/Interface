import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {RaisedButton} from 'material-ui'

/*global Uint8ClampedArray*/
/*eslint no-undef: "error"*/

function getMonoPixels(data){
        const lengthMono = data.length >> 2 // length >> 2 equals length / 4, but this will work only for 32-bit numbers,  for example max image size ~1024 megapixels
        var monoPixels = new Uint8ClampedArray(lengthMono)
        for(let i = 0; i < lengthMono; i++){
            monoPixels[i] = data[i << 2]
        }
        return monoPixels
    }
function getCompressedMonoPixels(monoPixels){
    let lengthTarget = monoPixels.length >> 3 //equals / 8
    let lastPiece = monoPixels.length % 8
    let beforeLastPiece = monoPixels.length - lastPiece
    if(lastPiece) {
        lengthTarget += 1
    }
    var compressedMonoPixels = new Uint8ClampedArray(lengthTarget)
    for(let i = 0; i < lengthTarget - 1; i++){
        for(let j = 0; j < 8; j++){
            let bit = monoPixels[(i << 3) + j] === 0 ? 0 : 1 //semicolons need to high priority
            compressedMonoPixels[i] |= bit << j
        }
    }
    for(let j = 0; j < lastPiece; j++){
        let bit = monoPixels[beforeLastPiece + j] === 0 ? 0 : 1
        compressedMonoPixels[lengthTarget - 1] |= bit << j
    }
    return compressedMonoPixels
}
function pixelsWithParameters(compressedMonoPixels, width, height){
    const dimSize = 4
    const dimensions = Buffer.alloc(dimSize)
    dimensions.writeInt16BE(width)
    dimensions.writeInt16BE(height, 2)

    const img = Buffer.from(compressedMonoPixels)
    const size = dimSize + compressedMonoPixels.length
    const res =  Buffer.concat([dimensions, img], size)

    return res
}

export default class InputImage extends Component {
    
    onChangeFileImage(e) {
        var file = e.target.files[0]
        var urlObj = URL.createObjectURL(file)
        const img = new window.Image()
        img.src = urlObj
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            context.drawImage(img, 0, 0 )
            const myData = context.getImageData(0, 0, img.width, img.height).data
            console.log(myData)
            const monoPixels = getMonoPixels(myData)
            console.log(monoPixels)
            const compressedMonoPixels = getCompressedMonoPixels(monoPixels)
            console.log(compressedMonoPixels)
            const resPixels = pixelsWithParameters(compressedMonoPixels, img.width, img.height)
            console.log(resPixels)
            var image = { file: urlObj, width: img.width, height: img.height, pixels: resPixels}
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
