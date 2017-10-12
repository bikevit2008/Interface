import { SET_IMAGE } from '../constants/InputImage'

const initialState = {
    image: {
        file: undefined,
        width: 0,
        height: 0,
        pixles: undefined
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
