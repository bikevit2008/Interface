
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InputImage from '../components/InputImage'

import { setImage }  from '../actions/inputImage'

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setImage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputImage)
