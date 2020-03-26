import {ADD_TODO, TOGGLE_TODO, LOGIN_USER_NORMAL} from './actionTypes'

let nextId = 0
export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextId++,
    text

})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})


// Login Actions
export const loginUserNormal = (user, loggedInStat) => ({
    type: LOGIN_USER_NORMAL,
    username: user,
    loggedIn: loggedInStat

})