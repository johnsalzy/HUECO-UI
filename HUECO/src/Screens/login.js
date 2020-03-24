// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
} from "react-native";

//Import Screens/Components/Styles
import {view_style, text_input, buttons} from '../Assets/Styles/styles';

class Login extends Component {
    state = {
        username: '',
        password: '',
        loggedIn: false,
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={{color:'#EF7B45', fontSize:70, textAlign: 'center', fontWeight: 'bold'}}>
                      Heuco
                    </Text>
                    <View style={view_style.default}>
                        <TextInput style={text_input.default} 
                            placeholder='Username'
                            onChangeText = {(username) => this.setState({username})}
                            value = {this.state.username}
                        />
                        <TextInput style={text_input.default} 
                            placeholder='Password'
                            onChangeText = {(password) => this.setState({password})}
                            value = {this.state.password}
                        />
                    </View>
                    <TouchableOpacity onPress={() => alert('Reset Password Page Here')}>
                        <Text style={{color: 'white', fontSize:10, paddingTop: '5%', 
                                        paddingLeft: '5%', textAlign: 'center'}}
                        >
                        Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#042A2B',
        paddingTop: 40
    }
});