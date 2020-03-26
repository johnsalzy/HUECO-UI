const login = (state = {username: '', status: false}, action) => {
    switch (action.type) {
        case 'LOGIN_USER_NORMAL':
            alert('etssst')


            return {
                    ...state,
                    status: action.loggedIn,
                    username: action.username,
                }
        default:
            return state
    }
}

export default login