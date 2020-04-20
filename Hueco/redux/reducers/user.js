const user = (state = { userProfile: null, needToUpdate: false}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_PROFILE':
            return {
                ...state, 
                needToUpdate: action.data,
            }
        case 'SET_USER_PROFILE':
            return {
                ...state, 
                userProfile: action.data,
            }
        case 'DELETE_USER_DATA':
            return {
                userProfile: null,
            }
        default:
            return state
    }
}
export default user