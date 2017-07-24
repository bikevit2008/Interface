
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InputImageComponent from '../components/InputImageComponent'

import * as InputImageActions from '../actions/InputImageActions'

function mapStateToProps(state) {
    return {
        image: state.InputImageReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        InputImageActions: bindActionCreators(InputImageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputImageComponent)
