import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from '../Reducers/visibilityFilter'

export default combineReducers({
    todos,
    visibilityFilter
})