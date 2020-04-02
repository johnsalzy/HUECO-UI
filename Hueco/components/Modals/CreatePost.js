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
import ImagePickerExample from '../ImagePicker';

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
                                    placeholder='Sent this sick v5 today...'
                                    onChangeText = {(title) => this.setState({title})}
                                    value = {this.state.title}
                                />

                                <Text style={styles.text}>Tag A Friend/Route(Optional)</Text>
                                <View style={styles.flexRow}>
                                    <TouchableOpacity onPress={() => alert('tag friend') }>
                                        <Icon size={30} color='pink' name='person-add'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => alert('add route') }>
                                        <Icon size={30} color='orange' name='map'/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>Attach Media(Optional)</Text>
                                <ImagePickerExample />
                                
                                
                                
                                
                                <View style={{paddingTop: 10}}>
                                    <Button
                                        title="Post!"
                                        onPress={() => this.handleSubmit()}
                                    />
                                </View>
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
    text: {
        paddingTop: 5,
        fontSize: 16,
    },
    flexRow: {
        flexDirection: 'row',
    }
});