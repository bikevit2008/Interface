import React, { PropTypes, Component } from 'react'
import { Layer, Stage, Image } from 'react-konva';


export default class InputImageComponent extends Component {
  onChangeFileImage(e) {
    var files = e.target.files[0]
    console.log(files)
    var urlObj = URL.createObjectURL(files)
    console.log(urlObj)
    this.props.setImage(urlObj)
  }
 state = {
  image: null,
  width: 0,
  height: 0
}
  componentDidUpdate() {
  const image = new window.Image();
  image.src = this.props.file;
  image.onload = () => {
    this.setState({
      image: image,
      width: image.width,
      height: image.height
    });
  }
}
 
  render() {
    const { file } = this.props
    return <div className='ib page'>
              <Stage width={this.state.width} height={this.state.height}>
                  <Layer>
                    <Image image={this.state.image} />
                  </Layer>
              </Stage>
        <img src={file} />
   <p>Выберите изображение</p>
       <input type='file' onChange={::this.onChangeFileImage} />
    </div>
  }
}

InputImageComponent.propTypes = {
  file: PropTypes.object.isRequired
}
