// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    Dimensions
} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//Import Screens/Components/Styles
// import {view_style, text_input, buttons} from '../assets/styles/styles';

//Redux imports
import {connect} from 'react-redux';
// import { loginUserNormal } from '../redux/actions'

const mapStateToProps = state => (
    {
    login: state.login
    }
)


class Register extends Component {
    state = {
        modalVisible: this.props.modalVisible,
    }
    closeModal = () => {
        this.props.closeModal()
    }
    render() {
        let {modalVisible} = this.state
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.container}
                >
                    <Text>This is inmodal</Text>
                    <TouchableOpacity onPress={() => this.closeModal() }>
                        <Text>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        );
    }
}
export default connect(mapStateToProps)(Register);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: '80%', 
        height: '80%', 
        marginTop: windowHeight*.1,
        marginLeft: windowWidth*.1,
        padding: 10,
        borderRadius: 4,

    }
});