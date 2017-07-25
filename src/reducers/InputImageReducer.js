import { SET_IMAGE } from '../constants/InputImageConstants'

const initialState = {
    image: {
        file: '',
        width: 0,
        height: 0
    }
}

export default function inputImageState(state = initialState, action) {

    switch (action.type) {
        case SET_IMAGE:
            return { ...state, image: action.payload }

        default:
            return state;
    }

}
