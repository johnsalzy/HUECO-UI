import {ADD_TODO, TOGGLE_TODO, LOGIN_USER_NORMAL, LOGOUT_USER_NORMAL} from './actionTypes'

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
export const loginUserNormal = (user, pass, access_token, refresh_token, loggedInStat) => ({
    type: LOGIN_USER_NORMAL,
    username: user,
    password: pass,
    loggedIn: loggedInStat,
    access_token: access_token, 
    refresh_token: refresh_token
})


export const logoutUser = (user) => ({
    type: LOGOUT_USER_NORMAL,
    username: '',
    password: '',
    loggedIn: false
})