import { StyleSheet } from 'react-native'

const buttons = StyleSheet.create({
    primary: {
        flex: 1,
        height: 70,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    }
})
const text_input = StyleSheet.create({
    default: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 20,
        paddingLeft: 15,
        width: '70%',
        borderRadius: 20,
        borderWidth: 1, 
        borderColor: '#D84727',
    }
})

const view_style = StyleSheet.create({
    default: {
        alignItems: 'center'
    }
})
  
export { view_style, text_input, buttons }