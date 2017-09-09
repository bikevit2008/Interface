import { combineReducers } from 'redux'
import inputImage from './inputImage'
import webSocket from './webSocket'
import engrave from './engrave'

export default combineReducers({
    inputImage,
    webSocket,
    engrave
})