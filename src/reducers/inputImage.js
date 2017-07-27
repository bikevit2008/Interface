import { SET_IMAGE } from '../constants/InputImage'

const initialState = {
  file: 'https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
}

export default function inputImageState(state = initialState, action) {

  switch (action.type) {
    case SET_IMAGE:
      return { ...state, file: action.payload }

    default:
      return state;
  }

}