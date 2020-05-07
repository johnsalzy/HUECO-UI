// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Image,
} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Import Screens/Components/Styles
import {view_style, text_input, buttons} from '../assets/styles/styles';
import Register from '../components/Modals/Register';
import { LOGO } from '../assets';

//Redux imports
import {connect} from 'react-redux';
import { loginUserNormal } from '../redux/actions'
import ResetPassword from '../components/Modals/ResetPassword';
const mapStateToProps = state => (
    {
    login: state.login
    }
)


class Login extends Component {
    state = {
        email: 'salzmajm@mail.uc.edu',
        password: 'Gruffalo',
        loggedIn: false,
        errorPresent: false,
        error_text: '',
        loginSuccess: true,
        registerUser: false,
        response: {},
        loginDataLoaded: false,
        modalVisible: false,
        resetPassPage: false,
    }
    componentDidUpdate(){
        let {email} = this.state;
        if(this.state.loginDataLoaded){
            this.setState({loginDataLoaded: false})
            this.login_email(email)
        }
    }

    getLoginDetails = (email, pass) => {
        // alert('Comp Updated: ' + JSON.stringify(this.state))
        this.setState({loginSuccess: false})
        fetch("http://3.133.123.120:8000/auth/token/wuser", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: 'NTMtzF7gzZPU9Ka35UFsDHvpR8e4D1Fy4OPRsurx',
            grant_type: 'password', 
            username: email, 
            password: pass, 
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({response: responseData, loginDataLoaded: true, loginSuccess: true})
        })
        .done();
        
    }

    login_email = (email) => {
        // Clear slate
        this.setState({loginSuccess: true, errorPresent: false, error_text: ""})
        let response = this.state.response;
        if(response.error){
            this.setState({loginSuccess: true, errorPresent: true, error_text: response.error_description})
            return
        }
        this.props.dispatch(loginUserNormal(email, response))
        return

        
    }
    closeModal = () => {
        this.setState({modalVisible: false});
    }

    render() {
        let { modalVisible, loginSuccess, resetPassPage} = this.state
        return (
            <View style={styles.container}>
                <View>
                    <Image source={ LOGO } style={{maxHeight: windowHeight*.30, width: '100%'}}/>
                    <View style={view_style.center}>
                        <TextInput style={text_input.default} 
                            placeholder='E-mail'
                            placeholderTextColor="black"
                            onChangeText = {(email) => this.setState({email})}
                            value = {this.state.email}
                            autoCapitalize = {"none"}
                        />
                        <TextInput style={text_input.default} 
                            placeholder='Password'
                            placeholderTextColor="black"
                            onChangeText = {(password) => this.setState({password})}
                            value = {this.state.password}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({resetPassPage: true})}>
                        <Text style={{color: 'white', fontSize:10, paddingTop: '3%', 
                                     textAlign: 'center'}}
                        >Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* To Display Login Errors */}
                    <Text style={{color: 'red', textAlign: 'center'}}>
                        {this.state.errorPresent ? this.state.error_text: ""}
                    </Text>

                    {loginSuccess ? 
                        <TouchableOpacity style={view_style.center } onPress={() => this.getLoginDetails(this.state.email, this.state.password)}>
                            <Text style={buttons.primary}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    :
                        <ActivityIndicator animating size='large'/>
                
                    }

                    <TouchableOpacity style={ view_style.center} onPress={() => this.setState({modalVisible: true})}>
                        <Text style={buttons.primary}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
                {modalVisible ? 
                    <View style={styles.viewModalIn}>
                        <Register 
                            closeModal={() => this.closeModal()} 
                            userRegistered={(u, p) => this.setState({email: u, password: p})} 
                            modalVisible={modalVisible}
                        />
                    </View>
                : null
                }
                {resetPassPage &&
                    <ResetPassword 
                        closeModal={() => this.setState({resetPassPage: false})} 
                        modalVisible={resetPassPage}
                    />
                }
            </View>
        );
    }
}
export default connect(mapStateToProps)(Login);
// export default connect()(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cornflowerblue',
        paddingTop: 40
    },
    viewModalIn: {
        width: windowWidth, 
        height: windowHeight,
        backgroundColor: '#00000080',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});