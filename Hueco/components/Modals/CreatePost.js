// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Button,
    TextInput,
} from "react-native";
import { Divider } from 'react-native-elements';
// import CameraRollPicker from 'react-native-camera-roll-picker';

//Import Screens/Components/Styles
import Icon from '../../components/Ionicon';
import { text_input } from '../../assets/styles/styles';

//Redux imports
import {connect} from 'react-redux';
// import { loginUserNormal } from '../redux/actions'


const mapStateToProps = state => (
    {
    login: state.login
    }
)


class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            login: this.props.login,
            title: '',
        };
    }

    closeModal = () => {
        this.props.closeModal()
    }
    handleSubmit = () => {
        alert('value: '+ JSON.stringify(this.state));
    }
    render() {
        return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                >
                    <View style={styles.container}>
                        <ScrollView>
                            <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => this.closeModal() }>
                                <Icon size={40} color='red' name='arrow-back'/>
                            </TouchableOpacity>
                            <Divider style={{ marginTop: 5, backgroundColor: 'black', height: 2 }} />
                            <View style={{padding: 10}}>
                                <Text>Title</Text>
                                <TextInput style={text_input.post} 
                                    placeholder='Title'
                                    onChangeText = {(title) => this.setState({title})}
                                    value = {this.state.title}
                                />
                                <Text>Tag A route(Optional)</Text>
                                <Text>Tag A friend(Optional)</Text>
                                <Text>Upload A picture(Optional)</Text>
                                {/* <CameraRollPicker callback={this.getSelectedImages}/> */}

                                <Button
                                    title="Post!"
                                    onPress={() => this.handleSubmit()}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
        );
    }
}
export default connect(mapStateToProps)(CreatePost);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: '100%', 
        height: '100%', 
        marginTop: 0,
        marginLeft: 0,
        padding: 10,
        borderRadius: 4,
    },
});