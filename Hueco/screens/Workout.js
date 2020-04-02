import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Button,
} from "react-native";

//Import Component/Store/etc.
import AddTodo from '../redux/containers/AddTodo'
import VisableTodos from '../redux/containers/VisableTodos'
import {app_styles} from '../assets/styles/universal'

class Workout extends Component {
    render() {

        return (
            <View style={app_styles.screen}>
                <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>This is Workouts Page</Text>

                <View>
                    <AddTodo />
                    <Text style={{fontSize:20, paddingTop: '5%', paddingLeft: '5%', alignContent: 'center', fontWeight: 'bold'}}>
                      Dispaly List
                    </Text>
                  <VisableTodos />
                </View>
            </View>
        );
    }
}
export default Workout;