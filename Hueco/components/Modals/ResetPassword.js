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

import Icon from '../Ionicon'
import { titles } from '../../assets/styles/text'
import {view_style, text_input, buttons} from '../../assets/styles/styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            type: this.props.type,
        };
    }

    render() {
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
                                                <TextInput style={text_input.default} 
                                                    placeholder='E-mail'
                                                    placeholderTextColor="black"
                                                    onChangeText = {(email) => this.setState({email})}
                                                    value = {this.state.email}
                                                    autoCapitalize = {"none"}
                                                />
                                                <TouchableOpacity style={view_style.center } onPress={() => alert('Waiting on API route')}>
                                                    <Text style={{borderColor: 'red', borderRadius: 10, borderWidth: 3, padding: 5}}>
                                                        Send Reset Password Link
                                                    </Text>
                                                </TouchableOpacity>
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
        backgroundColor: 'white',
        borderRadius: 10,
    },
});