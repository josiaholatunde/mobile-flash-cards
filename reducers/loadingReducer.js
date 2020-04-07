import { SET_LOADING } from "../actions"

export default function (state=null, { type, payload }) {
    switch (type) {
        case SET_LOADING:
            return payload
        default:
            return state
    }
}