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


//Import Screens/Components/Styles
import Icon from '../../components/Ionicon';
import MediaPicker from '../ImagePicker';
import TagFriend from '../Tags/tagFriend';
import TagRoute from '../Tags/tagRoute';
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
            tagFriend: false,
            taggedFriends: [1,2],
            taggedRoute: 510,
            imagePosted: null,
            tagRoute: false,
            caption: null,
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            response: null,
            postingMedia: null
        };
    }

    closeModal = () => {
        this.props.closeModal()
    }
    handleSubmit = () => {
        let {login, media, title, taggedFriends, taggedRoute, baseAPI} = this.state

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json")
        myHeaders.append("Authorization", "Bearer " + login.access_token);
        myHeaders.append("Content-type", "multipart/form-data");

        var formdata = new FormData();
        formdata.append("text", title);
        var arrayLength = taggedFriends.length;
        for (var i = 0; i < arrayLength; i++) {
            formdata.append("tagged_users", taggedFriends[i]);
        }
        if(taggedRoute){
            formdata.append("route", taggedRoute);
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };
        if(media){
            let uri = Platform.OS === "android" ? media.uri : media.uri.replace("file://", "")
            formdata.append("media.media", {uri:uri, type:'image/jpeg', name:'postUpload'});
        }
        this.setState({response: null, postingMedia: true})
        fetch(baseAPI + 'post/', requestOptions)
        .then(result => this.setState({response: result}))
        .catch(error => console.log('error ' + error));
    }

    render() {
        let { tagFriend, tagRoute, response } = this.state;
        if (response!= null){
            this.setState({postingMedia: false})
            if(response.status == 201){
                alert('post worked')
            } else {
                alert('Post failed: '+ JSON.stringify(response.status))
            }
            
        }
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
                                    <TouchableOpacity onPress={() => this.setState({tagFriend: !tagFriend})}>
                                        <Icon size={30} color='dodgerblue' name='person-add'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({tagRoute: !tagRoute})}>
                                        <Icon size={30} color='dodgerblue' name='map'/>
                                    </TouchableOpacity>
                                </View>
                                {tagFriend && 
                                    <TagFriend 
                                    updateTagFriends={(tags) => this.setState({taggedFriends: tags})}
                                    closeFriends={() => this.setState({tagFriend: false})}/>
                                }
                                {tagRoute && <TagRoute closeRoute={() => this.setState({tagRoute: false})}/>}
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




        // alert('postData: '+ JSON.stringify(post));
        // fetch(baseAPI + 'post', {
        //     method: "POST",
        //     // headers: {
        //     //     'Authorization': 'Bearer ' + login.access_token,
        //     //     'Accept': 'application/json',
        //     //     'Content-Type': 'application/json'
        //     // },
        //     // body: "uname=value1&password=value2"
        // })
        //   .then(response => response.json())
        //   .then(response => {
        //     console.log("upload succes" + response);
        //     alert("Upload success!" + JSON.stringify(response));
        //     // this.setState({ post: null });
        //   })
        //   .catch(error => {
        //     // console.log("upload error" + error);
        //     // alert("Upload failed!" + error);
        //   });