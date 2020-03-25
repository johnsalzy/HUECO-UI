import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

//Import Component
import AddTodo from '../Redux/Containers/AddTodo'
import VisableTodos from '../Redux/Containers/VisableTodos'

class TodoApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AddTodo />
                <View>
                    
                    <Text style={{fontSize:20, paddingTop: '5%', paddingLeft: '5%', alignContent: 'center', fontWeight: 'bold'}}>
                      Dispaly List
                    </Text>
                  <VisableTodos />
                </View>
            </View>
        );
    }
}
export default TodoApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    }
});