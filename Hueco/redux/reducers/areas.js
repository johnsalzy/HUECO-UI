const areas = (state = {area_data: []}, action) => {
    switch (action.type) {
        case 'UPDATE_AREA_DATA':
            return {
                    ...state,
                    area_data: action.data,
                }
        default:
            return state
    }
}
export default areas