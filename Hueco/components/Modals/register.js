// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    Button,
    ActivityIndicator
} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Import Screens/Components/Styles
import { text_input} from '../../assets/styles/styles';

//Redux imports
import {connect} from 'react-redux';
// import { registerUserNormal } from '../redux/actions'


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            baseAPI: 'http://3.133.123.120:8000/api/v1/',
            modalVisible: this.props.modalVisible,
            errorPresent: false,
            registeringUser: false,
            errorText: '',
            response_register: null,
            first_name: '',
            last_name: '',
            password: '',
            email: '',
            username: '',
        };
    }
    register_user = () => {
        this.setState({errorPresent: false, errorText: ""})
        let { baseAPI, username, email, first_name, last_name, password } = this.state;
        if(username == ""){
            this.setState({errorPresent: true, errorText: "Must Enter Username"})
            return
        }
        if(email == ""){
            this.setState({errorPresent: true, errorText: "Must Enter email"})
            return
        } else {
            email = email.toLowerCase()
        }
        if(first_name == ""){
            this.setState({errorPresent: true, errorText: "Must Enter First Name"})
            return
        } else {
            first_name = first_name.toLowerCase()
        }
        if(last_name == ""){
            this.setState({errorPresent: true, errorText: "Must Enter Last Name"})
            return
        }
        if(password == ""){
            this.setState({errorPresent: true, errorText: "Must Enter Password"})
            return
        }else if (password.length < 8){
            this.setState({errorPresent: true, errorText: "Password Must Be At Least 8 Characters"})
            return
        }
        this.setState({registeringUser: true})
        fetch(baseAPI + 'users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
            })
        })
        .then()
        .then(response => response.json())
        .then((response) => this.setState({response_register: response}))
        .catch();



    }
    render() {
        let { modalVisible, errorPresent, errorText, response_register, registeringUser } = this.state;
        if(response_register){
            if(response_register.status == "User Created"){
                this.props.userRegistered(this.state.email, this.state.password)
                this.setState({response_register: null, registeringUser: false, password: ''})
                this.props.closeModal()
            } else {
                alert('Register Failed Because' + JSON.stringify(response_register))
                this.setState({errorText: "Register Failed", errorPresent: true ,response_register: null, registeringUser: false})
            }
        }
        return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <TouchableOpacity onPress={() => this.props.closeModal() } >
                        <TouchableWithoutFeedback>
                            <View style={styles.container}>
                                <ScrollView>
                                    <TouchableOpacity onPress={() => this.props.closeModal() }>
                                        <Text style={styles.modalLeave}>X</Text>
                                    </TouchableOpacity>
                                    <View style={styles.containerForm}>
                                        <View>
                                            <Text style={{paddingBottom: 5}}>Username</Text>
                                            <TextInput 
                                                style={text_input.register}
                                                onChangeText = {(username) => this.setState({username})}
                                                value = {this.state.username}
                                                autoCapitalize = {"none"}
                                            />

                                            <Text style={{paddingBottom: 5, paddingTop: 10}}>First Name</Text>
                                            <TextInput 
                                                style={text_input.register}
                                                onChangeText = {(first_name) => this.setState({first_name})}
                                                value = {this.state.first_name}
                                            />
                                            <Text style={{paddingBottom: 5, paddingTop: 10}}>Last Name</Text>
                                            <TextInput 
                                                style={text_input.register}
                                                onChangeText = {(last_name) => this.setState({last_name})}
                                                value = {this.state.last_name}
                                            />
                                            <Text style={{paddingBottom: 5, paddingTop: 10}}>Email</Text>
                                            <TextInput 
                                                style={text_input.register}
                                                onChangeText = {(email) => this.setState({email})}
                                                value = {this.state.email}
                                                autoCapitalize = {"none"}
                                            />


                                            <Text style={{paddingBottom: 5, paddingTop: 10}}>Password</Text>
                                            <TextInput 
                                                style={text_input.register}
                                                onChangeText = {(password) => this.setState({password})}
                                                value = {this.state.password}
                                                secureTextEntry={true}
                                                autoCapitalize = {"none"}
                                            />

                                            {errorPresent && <Text style={{color: 'firebrick', paddingTop: 10, textAlign: 'center'}}>Error: {errorText}</Text>}
                                            
                                            <View style={{paddingTop: 10, alignItems: 'center', alignContent: 'center'}}>
                                                { !registeringUser ? 
                                                    <Button
                                                        title="Sign Up!"
                                                        onPress={() => this.register_user()}
                                                    />
                                                :
                                                    <ActivityIndicator size="large" color="#0000ff" />
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            
        );
    }
}
export default connect()(Register);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: '90%', 
        height: '90%', 
        marginTop: windowHeight*.05,
        marginLeft: windowWidth*.05,
        padding: 10,
        borderRadius: 4,
    },
    modalLeave: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: 'red',
    },
    containerForm: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
      },
});