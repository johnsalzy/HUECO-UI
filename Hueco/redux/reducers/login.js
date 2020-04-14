const login = (state = {username: '', status: false, access_token: '', refresh_token: '', expires: null}, action) => {
    switch (action.type) {
        case 'LOGIN_USER_NORMAL':
            return {
                    ...state,
                    status: true,
                    expires: Date.now()/1000 + action.expiration,
                    access_token: action.access_token,
                    refresh_token: action.refresh_token,
                    username: action.username,
                    full_name: action.full_name,
                    id: action.id,
                }

        case 'LOGOUT_USER_NORMAL':
            return {
                ...state,
                status: false,
                access_token: '',
                refresh_token: '',
                username: null,
                id: null,
                expires: null,
            }
        case 'REFRESH_TOKEN':
            return {
                ...state,
                expires: Date.now()/1000 + action.expiration,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
            }      
        default:
            return state
    }
}
export default login