import { SET_IMAGE } from '../constants/InputImageConstants'

export function setImage(file) {
  return {
    type: SET_IMAGE,
    payload: file
  }

}