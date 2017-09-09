import React, { Component } from 'react'
import {MuiThemeProvider} from 'material-ui/styles'
import {RaisedButton} from 'material-ui'
import { WEBSOCKET_OPEN } from '../middleware/websocket'


export default class EngraveButton extends Component {
    onBtnClick() {
        const { pixels } = this.props.image
        this.props.wsSend(pixels)
    }
    render() {
        const style = {margin: '12px'}
        const {connectState, image} = this.props
        const disabled = connectState === WEBSOCKET_OPEN && image.file !== undefined ? false : true
        return (
            <MuiThemeProvider>
                <RaisedButton onClick={::this.onBtnClick} disabled={disabled} disabledBackgroundColor='green' disabledLabelColor='rgb(255, 255, 255)' label='Гравировать' style={style} backgroundColor='rgb(87, 224, 0)' labelColor='rgb(255, 255, 255)'/>  
            </MuiThemeProvider>
        )
    }
}
