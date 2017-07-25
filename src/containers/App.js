
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InputImageComponent from '../components/InputImageComponent'
import CanvasComponent from '../components/CanvasComponent'

import * as InputImageActions from '../actions/InputImageActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar} from 'material-ui';




class App extends Component {
    render() {
        const { setImage } = this.props.InputImageActions
        const { file, width, height } = this.props.inputImage.image
        const titleBar = 'Лазерная гравировка'

        return (
        <div>
            <MuiThemeProvider>
                <AppBar showMenuIconButton={false} title={titleBar} />
            </MuiThemeProvider>
            <CanvasComponent file={file} width={width} height={height} />
            <InputImageComponent setImage={setImage} />
        </div>
        )
  }
}

function mapStateToProps(state) {
    return {
        inputImage: state.InputImageReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        InputImageActions: bindActionCreators(InputImageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
