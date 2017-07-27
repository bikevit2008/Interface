import React, { Component } from 'react'


export default class InputImage extends Component {
  onChangeFileImage(e) {
    var files = e.target.files[0]
    console.log(files)
    var urlObj = URL.createObjectURL(files)
    console.log(urlObj)
    this.props.setImage(urlObj)
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
