import React, {Component} from 'react';
import { View, Platform } from 'react-native'
import { STATUS_BAR_HEIGHT } from '../Constants/index'
class MainScreen extends Component {
    static navigationOptions = () => ({
        title: 'Hueco',
        headerStyle: {
            height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
            blackgroundColor: '#2196f3',
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ?  STATUS_BAR_HEIGHT : 0,
            color: 'white'
        },
        headerLeft: <View><Text>I</Text></View>
    })
    render(){
        return(
            <View style={{flex: 1, blackgroundColor: '#ddd'}}>
                <Text>Hello</Text>
            </View>

        )
    }
}
export default MainScreen;