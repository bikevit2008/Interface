import { SET_IMAGE } from '../constants/inputImage'

export function setImage(file) {
  return {
    type: SET_IMAGE,
    payload: file
  }

}
