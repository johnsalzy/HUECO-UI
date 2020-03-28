import { combineReducers } from 'redux'

//Import Reducers
import todos from './todos';
// import visibilityFilter from './visibilityFilter';
import login from './login';
import user from './user';
import stats from './stats';

export default combineReducers({
    todos,
    // visibilityFilter,
    login,
    user,
    stats,
})