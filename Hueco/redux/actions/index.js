import {ADD_TODO, TOGGLE_TODO, LOGIN_USER_NORMAL, LOGOUT_USER_NORMAL, UPDATE_USER_DATA, DELETE_USER_DATA, UPDATE_USER_STATS, } from './actionTypes'
import {UPDATE_SEARCH_DATA, UPDATE_MEDIA_INDEX} from './actionTypes' // For updating media

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
export const loginUserNormal = (user, access_token, refresh_token, loggedInStat) => ({
    type: LOGIN_USER_NORMAL,
    username: user,
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



// User Actions
export const updateProfile = (userData) => ({
    type: UPDATE_USER_DATA,
    username: userData.username,
    name: userData.first_name + ' ' + userData.last_name,
    location: userData.profile.location,
    profile_pic: userData.profile.profile_pic,
    private: userData.profile.private,
})

export const clearProfile = (username) => ({
    type: DELETE_USER_DATA,
})


// Stat actions
export const updateUserStats = (data) => ({
    type: UPDATE_USER_STATS,
    toprope: {},
    boulder: {},
    alltime: {}
})


// Media Options
export const updateSearchData = (data, type_search) => ({
    type: UPDATE_SEARCH_DATA,
    data: data,
    type_search: type_search,
})
export const updateMediaIndex = (index) => ({
    type: UPDATE_MEDIA_INDEX,
    index: index
})