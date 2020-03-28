const user = (state = {dataLoaded: false, name: '', private: true, location: '', profile_pic: ''}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
            return {
                    dataLoaded: true,
                    username: action.username,
                    name: action.name,
                    location: action.location,
                    profile_pic: action.profile_pic,
                    private: action.private,
                }

        case 'DELETE_USER_DATA':
            return {
                username: '',
                name: '',
                location: '',
                profile_pic: '',
                private: true,
                dataLoaded: false,
            }
        default:
            return state
    }
}
export default user