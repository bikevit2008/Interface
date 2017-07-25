import { SET_IMAGE } from '../constants/InputImageConstants'

export function setImage(image) {
  return {
    type: SET_IMAGE,
    payload: image
  }

}
