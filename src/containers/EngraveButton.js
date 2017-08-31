
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EngraveButton from '../components/EngraveButton'

import {wsSend}  from '../actions/webSocket'

function mapStateToProps(state) {
    return {
        connectState: state.webSocket.connectState,
        image: state.inputImage.image
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ wsSend }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EngraveButton)
