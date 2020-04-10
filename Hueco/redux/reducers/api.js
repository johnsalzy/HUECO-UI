const api = (state = {baseAPI: "http://3.133.123.120:8000/api/v1/"}, action) => {
    switch (action.type) {
        case 'CHANGE_API':
            return {
                    ...state,
                    baseAPI: action.baseAPI,
                }
        default:
            return state
    }
}
export default api