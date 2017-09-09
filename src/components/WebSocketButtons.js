import React, { Component } from 'react'
import {MuiThemeProvider} from 'material-ui/styles'
import {RaisedButton} from 'material-ui'

export default class WebSocketButtons extends Component {
    onBtnClickConnect() {
        this.props.wsConnect('ws://echo.websocket.org')
    }
    onBtnClickDisconnect() {
        this.props.wsDisconnect()
    }
    render() {
        const style = {margin: '12px'}
        return (
            <div>
            <MuiThemeProvider>
                <RaisedButton onClick={::this.onBtnClickConnect} label='Подключиться' style={style} backgroundColor='rgb(87, 224, 0)' labelColor='rgb(255, 255, 255)'/>
             </MuiThemeProvider>
            <MuiThemeProvider>
                <RaisedButton onClick={::this.onBtnClickDisconnect} label='Отключиться' style={style} backgroundColor='red' labelColor='rgb(255, 255, 255)'/>  
            </MuiThemeProvider>
            </div>
        )
    }
}
