// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

//Import Screens/Components/Styles
import {view_style, text_input, buttons} from '../assets/styles/styles';

//Redux imports
import {connect} from 'react-redux';
import { loginUserNormal } from '../redux/actions'

const mapStateToProps = state => (
    {
    login: state.login
    }
)

class Login extends Component {
    state = {
        username: '',
        password: '',
        loggedIn: false,
        loggedInStr: 'false',
        errorPresent: false,
        error_text: '',
        loginSuccess: false,
        registerUser: false
    }
    login_username = (user, pass) => {
        
        this.setState({loginSuccess: false, errorPresent: false, error_text: ""})
        // alert('Logging in user')
        if (this.state.username.length===0 || this.state.password.length===0 ){
            this.setState({errorPresent: true, error_text: "Please Enter a Username/Password"})
            return
        } 
        //Call API to validate login


        if( this.state.loginSuccess) {
            this.setState({errorPresent: true, error_text: "Invalid Login"})
            return
        } else {
            this.setState({loginSuccess: true, loggedInStr: 'true'})
            this.props.dispatch(loginUserNormal(user, true))
            //Update Redux with new state (true)
            // alert('User Logged In: ' + user)
            
            // alert('User Logged State: ' + this.state.login)
            return

        }

        this.setState({errorPresent: true, error_text: 'Invalid Login'})
    }
    render() {
        // alert('User Logged Props: ' + JSON.stringify(this.props.login))
        return (
            <View style={styles.container}>
                <View style={styles.container, {paddingTop: '0%'}}>
                    <Text style={{color:'#F4DF73', paddingBottom: '0%', marginTop: '-2%', fontSize:60, textAlign: 'center', fontWeight: 'bold'}}>
                      Rock
                    </Text>
                    <Text style={{color:'#F4DF73', paddingBottom: '0%', fontSize:60, marginTop: '-5%', textAlign: 'center', fontWeight: 'bold'}}>
                      & 
                    </Text>
                    <Text style={{color:'#F4DF73', paddingBottom: '3%', fontSize:60, marginTop: '-5%', textAlign: 'center', fontWeight: 'bold'}}>
                      Rope
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
                        <Text style={{color: 'white', fontSize:10, paddingTop: '3%', 
                                     textAlign: 'center'}}
                        >Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* To Display Login Errors */}
                    <Text style={{color: 'red', textAlign: 'center'}}>
                        {this.state.errorPresent ? this.state.error_text: ""}
                    </Text>

                    <TouchableOpacity style={view_style.center } onPress={()=> this.login_username(this.state.username, this.state.password)}>
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

                    <Text style={{color: 'pink'}}>Logged In: {this.state.loggedInStr}</Text>
                    
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
export default connect(mapStateToProps)(Login);
// export default connect()(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052F5F',
        paddingTop: 40
    }
});