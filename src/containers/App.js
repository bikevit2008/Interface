
import React, { Component } from 'react'

import InputImageComponent from './InputImageComponent'
import CanvasComponent from '../components/CanvasComponent'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar} from 'material-ui';




export default class extends Component {
    render() {
        const { file } = this.props.image;
        const titleBar = 'Лазерная гравировка';

        return (
        <div>
            <MuiThemeProvider>
                <AppBar showMenuIconButton={false} title={titleBar} />
            </MuiThemeProvider>
            <CanvasComponent file={file} />
            <InputImageComponent />
        </div>
        )
  }
}
