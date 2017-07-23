import React, { PropTypes, Component } from 'react'
import {Layer, Stage, Image} from 'react-konva';


export default class CanvasComponent extends Component {
  render() {
    const { year, photos } = this.props
    return <div>
      <p>У тебя {photos.length} фото за {year} год</p>
    </div>
  }
}

Page.propTypes = {
  file: PropTypes.object.isRequired
}