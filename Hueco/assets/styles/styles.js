import { StyleSheet } from 'react-native'

const buttons = StyleSheet.create({
    primary: {
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        borderColor: '#F4DF73',
        color: 'white',
        borderRadius: 20,
        borderWidth: 3, 
        width: '80%',
        padding: 9,
        margin: 10,
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
    },
    closeText: {
        paddingTop: 5,
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
    },
    searchText: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'lightblue',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 31
    },
    add: {
        padding: 2,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    delete: {
        padding: 2,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    }
})
const text_input = StyleSheet.create({
    default: {
        height: 50,
        backgroundColor: '#4F6E91',
        borderColor: '#E0F2E9',
        marginTop: 20,
        paddingLeft: 15,
        width: '80%',
        borderRadius: 50,
        borderWidth: 2, 
        color: '#E0F2E9',
    },
    post: {
        height: 50,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingLeft: 15,
        width: '80%',
        borderRadius: 20,
        borderWidth: 2, 
    },
    register: {
        height: 50,
        borderColor: '#E0F2E9',
        paddingLeft: 10,
        width: '80%',
        borderRadius: 50,
        borderWidth: 2, 
        color: 'black',
    },
    search:{
        padding: 4,
        fontSize: 15,
        borderWidth: 2,
        backgroundColor: 'lightskyblue',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 10,
        height: 35
    },
})

const view_style = StyleSheet.create({
    center: {
        alignItems: 'center',
        alignContent: 'center'
    }
})

const search_results = StyleSheet.create({
    resultContainer: {
        padding: 7, 
        borderRadius: 8, 
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: 'black'
    },
})
const dividers = StyleSheet.create({
    standard: { margin: 5, backgroundColor: 'black', height: 2 }
})

const loaders = StyleSheet.create({
    standard: {color:"#0000ff"},
})
const avatars = StyleSheet.create({
    small: {        
        width: 40,
        height: 40,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center',}
})
const containers = StyleSheet.create({
    small_search_result: {
        backgroundColor: 'lightgray',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        marginBottom: 2,
        marginTop: 2,
    },

})
const info = StyleSheet.create({
    user_search_info: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },

})
export { view_style, text_input, buttons, search_results, dividers, loaders, avatars, containers, info }