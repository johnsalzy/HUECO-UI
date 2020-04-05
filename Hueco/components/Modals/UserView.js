// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Button,
    Dimensions,
    TextInput,
} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;

class UserViewModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            // modalVisible = false,
            data: this.props.data,
        };
    }


    render() {
        let { modalIsVisable, data } = this.state

        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.modalVisable}
            >   
                <TouchableOpacity onPress={() => this.props.closeModal()} >
                        <View style={styles.container}>
                            <View style={styles.containerModal}>
                                <ScrollView>
                                    <TouchableWithoutFeedback style={styles.containerModal}>
                                        <View>
                                            <Text>User Profile View Page</Text>
                                            <Text>User {data.username}</Text>
                                            <Text>{JSON.stringify(data)}</Text>
                                            <TouchableOpacity onPress={() => this.props.closeModal()}>
                                                <Text style={styles.optionDismiss}>Dismiss</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>
                        </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}
export default UserViewModal;


const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        height: '100%',
        backgroundColor: '#00000080',
    },
    containerModal: {
        position: 'absolute',
        height: '80%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 6,
        top: windowHeight*.10,
        left: windowWidth*.10,
    },
    modalLeave: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: 'red',
    },
      optionStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'cornflowerblue',
        padding: 2,
      },
      optionDismiss: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'sandybrown',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }
});