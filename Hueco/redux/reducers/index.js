import { combineReducers } from 'redux'

//Import Reducers
import todos from './todos';
import login from './login';
import user from './user';
import stats from './stats';
import media from './media';

export default combineReducers({
    todos,
    login,
    user,
    stats,
    media,
})