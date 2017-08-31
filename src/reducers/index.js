import { combineReducers } from 'redux'
import inputImage from './inputImage'
import webSocket from './webSocket'

export default combineReducers({
  inputImage,
  webSocket
})