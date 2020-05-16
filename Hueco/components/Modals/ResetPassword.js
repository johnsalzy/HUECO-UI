// Import needed Libs
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Text,
    Dimensions,
    TextInput,
} from "react-native";
import { showMessage } from "react-native-flash-message";


import Icon from '../Ionicon'
import { titles } from '../../assets/styles/text'
import {view_style, text_input, buttons} from '../../assets/styles/styles';
import { fetchGetNoAuth, fetchPostNoAuth } from '../../functions/api';
import { ActivityIndicator } from "react-native-paper";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            reset_requested: false,
            email: '',
            reset_code: '',
            new_password: '',
            new_password2: '',
            error: false,
            error_text: "",
            loading: false,
        };
    }

    async resetPassword(){
        let {new_password, new_password2, reset_code, email} = this.state;
        this.setState({error: false, loading: true})
        if(!(new_password === new_password2)){
            this.setState({error: true, error_text: 'Passwords Do Not Match', loading: false})
            return
        } else if (reset_code == ""){
            this.setState({error_text: "Enter Your Reset Token", error: true, loading: false})
            return
        }
        let body = {
            email: email,
            token: reset_code,
            password: new_password,
        }
        let resposne = await fetchPostNoAuth('users/reset_password/ ', body)
        if(resposne.status == 200){
            this.setState({new_password: "", new_password2: "", reset_code: "", loading: false})
            showMessage({
                message: "Password Reset",
                type: "success",
                titleStyle: {fontWeight: 'bold', fontSize: 14},
                floating: true,
                icon: { icon: "success", position: "left" }
            })
            this.props.closeModal()
        } else {
            this.setState({error: true, error_text: "Cound Not Reset Password, Check For Incorrect Reset Token", loading: false})
        }
    }

    async requestReset(){
        let { email } = this.state;
        this.setState({loading: true})
        let resposne = await fetchGetNoAuth('users/request_reset_password/?email=' + email)
        if(resposne.detail){
            this.setState({error: true, error_text: "No Account With That Email", loading: false})

        } else {
            this.setState({reset_requested: true, error: false, loading: false})
        }
    }

    render() {
        let {reset_requested, error, error_text, loading} = this.state;
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.modalVisable}
            onRequestClose={() => this.props.closeModal()}
            >   
                <TouchableOpacity onPress={() => this.props.closeModal()} >
                        <View style={styles.container}>
                            <View style={styles.containerModal}>
                                    <TouchableWithoutFeedback style={styles.containerModal}>
                                        <View>
                                            <View style={{alignItems: 'center'}}>
                                                <Text style={titles.page_header}>Reset Password</Text>
                                                {reset_requested ? 
                                                    <View style={{width: '80%', alignItems: 'center'}}>
                                                        <TextInput style={text_input.default} 
                                                            placeholder='Re-Set Code Sent To Email'
                                                            placeholderTextColor="black"
                                                            onChangeText = {(reset_code) => this.setState({reset_code})}
                                                            value = {this.state.reset_code}
                                                            autoCapitalize = {"none"}
                                                        />
                                                        <TextInput style={text_input.default} 
                                                            placeholder='New Password'
                                                            secureTextEntry={true}
                                                            placeholderTextColor="black"
                                                            onChangeText = {(new_password) => this.setState({new_password})}
                                                            value = {this.state.new_password}
                                                            autoCapitalize = {"none"}
                                                        />
                                                        <TextInput style={text_input.default} 
                                                            placeholder='Confirm New Password'
                                                            secureTextEntry={true}
                                                            placeholderTextColor="black"
                                                            onChangeText = {(new_password2) => this.setState({new_password2})}
                                                            value = {this.state.new_password2}
                                                            autoCapitalize = {"none"}
                                                        />
                                                        {loading ? 
                                                            <ActivityIndicator size={'large'} animating/>
                                                        :
                                                            <TouchableOpacity style={ styles.button } onPress={() => this.resetPassword()}>
                                                                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                                                    Reset Password
                                                                </Text>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                :
                                                    <View style={{width: '80%', alignItems: 'center'}}>
                                                        <TextInput style={text_input.default} 
                                                            placeholder='E-mail'
                                                            placeholderTextColor="black"
                                                            onChangeText = {(email) => this.setState({email})}
                                                            value = {this.state.email}
                                                            autoCapitalize = {"none"}
                                                        />
                                                        {loading ? 
                                                            <ActivityIndicator size={'large'} animating/>
                                                        :
                                                            <TouchableOpacity style={ styles.button } onPress={() => this.requestReset()}>
                                                                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                                                    Send Reset Password Link
                                                                </Text>
                                                            </TouchableOpacity>
                                                        }
                                                        
                                                    </View>
                                                }
                                                {error && 
                                                    <View style={{paddingTop: 10}}>
                                                        <Text style={{textAlign: 'center', color: 'red'}}>{error_text}</Text>
                                                    </View>
                                                }
                                                <TouchableOpacity 
                                                    onPress={() => this.props.closeModal()}
                                                    style={{marginRight: 'auto', position: 'absolute', left: 0}}
                                                >
                                                    <Icon name={'arrow-back'} size={50} color={'firebrick'}/>
                                                </TouchableOpacity>
                                            </View>
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                            </View>
                        </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}
export default ResetPassword;

const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        height: '100%',
        backgroundColor: '#00000080',
        alignItems: 'center',
        justifyContent: "center"
    },
    containerModal: {
        position: 'absolute',
        width: '90%',
        height: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderColor: 'cornflowerblue', borderRadius: 10, 
        borderWidth: 3, padding: 5
    },
});