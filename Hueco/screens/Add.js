import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Button,
} from "react-native";

//Import Component/Store/etc.
import AddTodo from '../redux/containers/AddTodo'
import VisableTodos from '../redux/containers/VisableTodos'
// import { Ionicons } from "@expo/vector-icons";

class Add extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is add page</Text>

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
export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        padding: 10,
    },
});