
import { connect } from 'react-redux'

import Canvas from '../components/Canvas'

function mapStateToProps(state) {
    return {
        image: state.inputImage.image
    }
}

export default connect(mapStateToProps)(Canvas)
