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
    Platform
} from "react-native";
import { Divider } from 'react-native-elements';
import MediaPicker from '../ImagePicker';

//Import Screens/Components/Styles
import Icon from '../../components/Ionicon';
// import { text_input } from '../../assets/styles/styles';

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
            media: null,
            title: '',
            caption: null,
        };
    }

    closeModal = () => {
        this.props.closeModal()
    }
    handleSubmit = () => {
        // Get all post data...
        let { title, caption, media, login } = this.state;
        let post = {}
        post.title = title
        if(media){
            post.media = {
                caption: caption,//photo.fileName,
                type: media.type,
                uri: Platform.OS === "android" ? media.uri : media.uri.replace("file://", "")
            }
        }
        post.postedByUser = login.username
        post.tagged_users = []
        post.tagged_route = {}
        this.handleUploadPost(post)
    }


    handleUploadPost = (post) => {
        alert('postData: '+ JSON.stringify(post));

        return
        fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: {
                'Authorization': 'Bearer ' + this.state.access_token,
                post: post,
            }
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload succes", response);
            alert("Upload success!");
            this.setState({ post: null });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });
    };
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
                                <Icon size={40} color='firebrick' name='arrow-back'/>
                            </TouchableOpacity>
                            <Divider style={{ marginTop: 5, backgroundColor: 'black', height: 2 }} />
                            <View style={{padding: 10}}>
                                <Text>Title</Text>
                                <TextInput style={styles.text_input} 
                                    placeholder='Sent this sick v5 today...'
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(title) => this.setState({title})}
                                    value = {this.state.title}
                                />

                                <Text style={styles.text}>Tag A Friend/Route(Optional)</Text>
                                <View style={styles.flexRow}>
                                    <TouchableOpacity onPress={() => alert('tag friend') }>
                                        <Icon size={30} color='dodgerblue' name='person-add'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => alert('add route') }>
                                        <Icon size={30} color='dodgerblue' name='map'/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>Attach Media(Optional)</Text>
                                <MediaPicker 
                                    setCaption= {(caption) => this.setState({caption})} 
                                    propSetImage={(media) => this.setState({media})}
                                    deleteMedia={() => this.setState({media: null, caption: null})}
                                />
                                
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
    },
    text_input: {
        borderWidth: 2,
        backgroundColor: 'lightskyblue',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 10,
    }
});