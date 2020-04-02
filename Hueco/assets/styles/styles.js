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

export { view_style, text_input, buttons, search_results }