
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InputImageComponent from '../components/InputImageComponent'

import {setImage}  from '../actions/InputImageActions'

function mapStateToProps(state) {
    return {
        image: state.InputImageReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setImage: bindActionCreators(setImage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputImageComponent)
