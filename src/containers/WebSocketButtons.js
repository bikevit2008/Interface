
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import WebSocketButtons from '../components/WebSocketButtons'

import {wsConnect, wsDisconnect}  from '../actions/webSocket'

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({wsConnect, wsDisconnect}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WebSocketButtons)
