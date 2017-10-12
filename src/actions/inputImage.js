import { SET_IMAGE } from '../constants/InputImage'

export function setImage(image) {
  return {
    type: SET_IMAGE,
    payload: image
  }

}
