import React, { Component } from 'react'


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
        return (
            <div>
                <p>Выберите изображение</p>
                    <input type='file' onChange={::this.onChangeFileImage} />
            </div>
        )
    }
}
