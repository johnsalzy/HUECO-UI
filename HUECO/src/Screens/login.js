// Import needed Libs
import React, { Component } from "react";
import { Button } from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
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
        errorPresent: false,
        error_text: '',
        loginSuccess: false,
        registerUser: false
    }
    login_username = (user, pass) => {
        this.setState({errorPresent: false, error_text: ""})
        alert('Logging in user')
        if (this.state.username.length===0 || this.state.password.length===0 ){
            this.setState({errorPresent: true, error_text: "Please Enter a Username/Password"})
            return
        } 
        //Call API to validate login
        if(this.state.loginSuccess) {
            this.setState({errorPresent: true, error_text: "Invalid Login"})
            return
        } else {
            this.setState({loginSuccess: true})
        }

        this.setState({errorPresent: true, error_text: 'Invalid Login'})
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={{color:'#F4DF73', paddingBottom: '10%', fontSize:70, textAlign: 'center', fontWeight: 'bold'}}>
                      Hueco
                    </Text>
                    <View style={view_style.center}>
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
                        <Text style={{color: 'white', fontSize:10, paddingTop: '3%', paddingBottom: '2%',
                                        paddingLeft: '5%', textAlign: 'center'}}
                        >Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* To Display Login Errors */}
                    <Text style={{color: 'red', textAlign: 'center'}}>
                        {this.state.errorPresent ? this.state.error_text: ""}
                    </Text>

                    <TouchableOpacity style={view_style.center } onPress={()=> this.login_username(this.state.user, this.state.pass)}>
                        <Text style={buttons.primary}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ view_style.center} onPress={() => alert('Logging In with FB/Google')}>
                        <Text style={buttons.primary}
                        >
                            Login With Google or Facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ view_style.center} onPress={() => alert('Register')}>
                        <Text style={buttons.primary}
                        >
                            Register
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
        backgroundColor: '#052F5F',
        paddingTop: 40
    }
});