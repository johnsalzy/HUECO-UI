import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from '../reducers/visibilityFilter'

// import nav from './nav'

export default combineReducers({
    todos,
    visibilityFilter,
    // nav,
})