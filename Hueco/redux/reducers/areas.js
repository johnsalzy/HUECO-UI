const areas = (state = {status: [], area_data: []}, action) => {
    switch (action.type) {
        case 'UPDATE_AREA_DATA':
            return {
                    ...state,
                    area_data: action.data,
                }
        case 'SET_AREA_DATA':
            return {
                    ...state,
                    area_data: action.data,
                    status: action.status,
                }
        default:
            return state
    }
}
export default areas