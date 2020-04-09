import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Button,
    StyleSheet
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
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.textHeader}>New Routes Near You</Text>
                    <View style={styles.headerRow} >
                        <Text> Setter   |    Type      |            Name            | Grade </Text>
                        <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                        <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                        <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                        <Text>  Matt  | Top Rope  | Matt's First Route |   5.9</Text>
                    </View>
                </View>
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

const styles = StyleSheet.create({
    textHeader: {
      paddingTop: 20, 
      fontWeight: 'bold', 
      fontSize: 20
    },
    headerRow:{
      borderWidth: 2,
      width: '90%',
      borderColor:'black',
      margin:10,
    },
  });