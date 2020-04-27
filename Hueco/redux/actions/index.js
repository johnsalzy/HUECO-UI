import {ADD_TODO, TOGGLE_TODO, LOGIN_USER_NORMAL, LOGOUT_USER_NORMAL, DELETE_USER_DATA, 
        UPDATE_USER_STATS, REFRESH_TOKEN, UPDATE_USER_PROFILE, SET_USER_PROFILE } from './actionTypes'
import {UPDATE_SEARCH_DATA, UPDATE_MEDIA_INDEX} from './actionTypes' // For updating media
import {UPDATE_AREA_DATA, SET_AREA_DATA} from './actionTypes' // For updating media

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
export const loginUserNormal = (email, response) => ({
    type: LOGIN_USER_NORMAL,
    email: email,
    access_token: response.access_token, 
    refresh_token: response.refresh_token,
    expiration: response.expires_in,
    username: response.username,
    full_name: response.user_full_name,
    id: response.user_id,
})

export const refreshToken = (data) => ({
    type: REFRESH_TOKEN,
    data: data,
})

export const logoutUser = () => ({
    type: LOGOUT_USER_NORMAL,
    username: '',
    password: '',
    loggedIn: false
})



// User Actions
export const updateUserProfile = (data) => ({
    type: UPDATE_USER_PROFILE,
    data: data
})
export const setUserProfile = (data) => ({
    type: SET_USER_PROFILE,
    data: data
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


// Area Acitons
export const updateAreaData = (data) => ({
    type: UPDATE_AREA_DATA,
    data: data,
})

export const setAreaData = (data, status) => ({
    type: SET_AREA_DATA,
    data: data,
    status: status
})