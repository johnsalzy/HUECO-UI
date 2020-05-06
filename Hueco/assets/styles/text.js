import { StyleSheet } from 'react-native'

const details = StyleSheet.create({
    not_found: {
        color: 'cornflowerblue',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
})

const titles = StyleSheet.create({
    regular: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'cornflowerblue',
    },
    page_header: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'cornflowerblue',
        textAlign: 'center',
        paddingVertical: 5,
    },
    titleDivider: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    }
})

export { details, titles }