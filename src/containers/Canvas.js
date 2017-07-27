
import { connect } from 'react-redux'

import Canvas from '../components/Canvas'

function mapStateToProps(state) {
    return {
        image: state.inputImage
    }
}

function mapDispatchToProps() {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)