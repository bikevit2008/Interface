
import React, { Component } from 'react'

import InputImage from './InputImage'
import Canvas from './Canvas'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar} from 'material-ui';




export default class App extends Component {
    render() {
        const titleBar = 'Лазерная гравировка';

        return (
        <div>
            <MuiThemeProvider>
                <AppBar showMenuIconButton={false} title={titleBar} />
            </MuiThemeProvider>
            <Canvas />
            <InputImage />
        </div>
        )
  }
}
