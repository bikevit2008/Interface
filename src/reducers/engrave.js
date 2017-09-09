import {
    NOT_STARTED,
    ENGRAVING,
    PAUSED,
    FINISHED,
    CANCELLED,
    ERROR
} from '../constants/Engrave'

import { WEBSOCKET_MESSAGE } from '../middleware/websocket'

const initialState = {
    status: NOT_STARTED
}

export default function engrave(state = initialState, action) {

    switch (action.type) {
        case WEBSOCKET_MESSAGE:
            switch (action.payload.data.status) {
                case NOT_STARTED:
                case ENGRAVING:
                case PAUSED:
                case FINISHED:
                case CANCELLED:
                case ERROR:                
                        return { ...state, status: action.payload.data.status}
            default:
            return state
            }
            
        default:
            return state
    }

}
