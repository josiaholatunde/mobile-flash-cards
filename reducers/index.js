import { combineReducers } from 'redux'
import decksReducer from './decksReducer'
import loadingReducer from './loadingReducer'

export default combineReducers({
    decks: decksReducer,
    loading: loadingReducer
})