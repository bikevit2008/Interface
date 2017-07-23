import React, { PropTypes, Component } from 'react'

export default class InputImageComponent extends Component {
  onChangeFileImage(e) {
    var files = e.target.files[0]
    console.log(files)
    var urlObj = URL.createObjectURL(files)
    console.log(urlObj)
    this.props.setImage(urlObj)
  }
  render() {
    const { file } = this.props
    return <div className='ib page'>     
        <img src={file} />
   <p>Выберите изображение</p>
       <input type='file' onChange={::this.onChangeFileImage} />
    </div>
  }
}

InputImageComponent.propTypes = {
  file: PropTypes.object.isRequired
}