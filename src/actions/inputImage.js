import { SET_IMAGE } from '../constants/InputImage'

export function setImage(file) {
  return {
    type: SET_IMAGE,
    payload: file
  }

}