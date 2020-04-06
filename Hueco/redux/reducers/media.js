const media = (state = {dataLoaded: false, type: null, index: null, data: {}, search_user: {count: 0,}}, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH_DATA':
            if(action.type_search == "Users"){
                // alert('post data updated for users')
                return {
                        ...state, 
                        dataLoaded: true,
                        search_user: action.data,
                        type_search: action.type_search,
                    }
                }
        case 'UPDATE_MEDIA_INDEX':
            // alert('updating index: ' + action.index)
            return {
                ...state,
                index: action.index,
            }
        default:
            return state
    }
}
export default media