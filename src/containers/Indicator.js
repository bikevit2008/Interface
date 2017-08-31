import { connect } from 'react-redux'

import Indicator from '../components/Indicator'

function mapStateToProps(state) {
    return {
        connectState: state.webSocket.connectState
    }
}


export default connect(mapStateToProps)(Indicator)
