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
    Dimensions,
    Button,
} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Redux imports

class AddButtons extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                >
                    <TouchableOpacity onPress={() => this.props.closeModal()} >
                            <View style={styles.container}>
                                <View style={styles.containerModal}>
                                    <View style={styles.containerForm}>
                                        <TouchableOpacity onPress={() => alert('adding route tick') }>
                                            <Text style={styles.optionStyle}>Add Route Tick</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => alert('creating post') }>
                                            <Text style={styles.optionStyle}>Create Post</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.closeModal()}>
                                            <Text style={styles.optionDismiss}>Dismiss</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    </TouchableOpacity>
                </Modal>
            
        );
    }
}
export default AddButtons;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red', 
        width: '100%', 
        height: '100%',
        backgroundColor: '#00000080',
        right: 0,
        marginBottom: windowHeight*.05,
        marginRight: windowWidth*.05,
        padding: 3,
        borderRadius: 4,
    },
    containerModal: {
        position: 'absolute',
        bottom: 150,
        right: 75,
    },
    modalLeave: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: 'red',
    },
    containerForm: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 6,
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
        color: 'salmon',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }
});