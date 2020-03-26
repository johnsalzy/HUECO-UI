import { combineReducers } from 'redux'

//Import Reducers
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import login from './login';

export default combineReducers({
    todos,
    visibilityFilter,
    login,
})