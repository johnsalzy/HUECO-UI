import { StyleSheet } from 'react-native'
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'

const app_styles = StyleSheet.create({
    background: {
        backgroundColor: '#EBEBEB'
    },
    screen: {
        flex: 1,
        paddingTop: 25,
        padding: 10,
        height: '100%',
        width: '100%',
        backgroundColor: '#EBEBEB',
    },
    screen2: {
        flex: 1,
        // paddingTop: 25,
        height: '100%',
        width: '100%',
        backgroundColor: '#EBEBEB',
        ...ifIphoneX({
            marginTop: 35
        }, {
            marginTop: 25
        })
    }
})

export { app_styles }