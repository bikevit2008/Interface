import React, { Component } from 'react'
//import {RaisedButton} from 'material-ui'
import styles from './Indicator.css'
import { WEBSOCKET_OPEN } from '../middleware/websocket'




export default class Indicator extends Component {
    render() {
        const {connectState} = this.props
        const status = connectState === WEBSOCKET_OPEN ? 'Online' : 'Offline'
        const indicatorType = connectState === WEBSOCKET_OPEN ? styles.indicatorOnline : styles.indicatorOffline
        return (
            <div className={styles.indicator}>
                <span className={indicatorType}>
                    {status}
                </span>
            </div>
        )
    }
}
