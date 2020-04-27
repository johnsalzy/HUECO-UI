const stats = (state = 
    {
        dataLoaded: true,
        allTime: {
            toprope: [
                // { Grade: "5.7", Count: 19 },
                // { Grade: "5.8", Count: 15 },
                // { Grade: "5.9", Count: 6 },
                // { Grade: "5.10", Count: 2 },
                // { Grade: "5.11", Count: 0 }
            ],
            boulder: [
                // { Grade: "v1", Count: 12 },
                // { Grade: "v2", Count: 9 },
                // { Grade: "v3", Count: 6 },
                // { Grade: "v4", Count: 2 },
                // { Grade: "v5", Count: 1 }
            ],
        },
    }, action) => {
    switch (action.type) {
        case 'UPDATE_USER_STATS':
            return {
                    toprope: action.topRope,
                    boulder: action.boulder,
                    alltime: action.alltime
                }
        default:
            return state
    }
}
export default stats