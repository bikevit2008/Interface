import { SET_IMAGE } from '../constants/inputImage'

export function setImage(image) {
  return {
    type: SET_IMAGE,
    payload: image
  }

}
