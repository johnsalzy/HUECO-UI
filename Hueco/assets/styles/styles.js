import { StyleSheet } from 'react-native'

const buttons = StyleSheet.create({
    primary: {
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#E0F2E9',
        borderColor: '#4F6E91',
        color: 'black',
        borderRadius: 30,
        borderWidth: 3, 
        width: '80%',
        marginBottom: '1%',
        marginTop: '2%',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center'

    },
    closeText: {
        paddingTop: 5,
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
    },
    searchText: {
        padding: 4,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
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
    }
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

export { view_style, text_input, buttons, search_results, dividers }