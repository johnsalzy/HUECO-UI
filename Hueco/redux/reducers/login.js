const login = (state = {response: {}, username: '', status: false, access_token: ''}, action) => {
    switch (action.type) {
        case 'LOGIN_USER_NORMAL':
            return {
                    ...state,
                    status: action.loggedIn,
                    username: action.username,
                    access_token: action.access_token,
                    refresh_token: action.refresh_token,
                }

        case 'LOGOUT_USER_NORMAL':
            return {
                ...state,
                status: action.loggedIn,
                access_token: '',
                refresh_token: '',
                username: '',
            }
        default:
            return state
    }
}
export default login