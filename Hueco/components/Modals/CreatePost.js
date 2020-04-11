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
    Platform,
    ActivityIndicator
} from "react-native";


//Import Screens/Components/Styles
import Icon from '../../components/Ionicon';
import MediaPicker from '../ImagePicker';
import TagFriend from '../Tags/tagFriend';
import TagRoute from '../Tags/tagRoute';
// import { text_input } from '../../assets/styles/styles';

//Redux imports
import {connect} from 'react-redux';



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
            taggedFriends: [],
            taggedRoute: null,
            imagePosted: null,
            tagRoute: false,
            caption: null,
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            response: null,
            postingMedia: false
        };
    }
    handleSubmit = () => {
        let {login, media, title, taggedFriends, taggedRoute, baseAPI} = this.state
        if (title == ""){
            alert('Please enter a title')
            return
        }
        this.setState({response: null, postingMedia: true})
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json")
        myHeaders.append("Authorization", "Bearer " + login.access_token);
        myHeaders.append("Content-type", "multipart/form-data");

        var formdata = new FormData();
        formdata.append("text", title);
        var arrayLength = taggedFriends.length;
        for (var i = 0; i < arrayLength; i++) {
            formdata.append("tagged_users", taggedFriends[i].id);
        }
        if(taggedRoute){
            formdata.append("route", taggedRoute.id);
        }
        if(media){
            let uri = Platform.OS === "android" ? media.uri : media.uri.replace("file://", "")
            formdata.append("media.media", {uri:uri, type:'image/jpeg', name:'postUpload'});
            formdata.append("media.media_type", media.type);
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };
        fetch(baseAPI + 'post/', requestOptions)
        .then(result => this.setState({response: result}))
        .catch(error => console.log('error ' + error));
    }

    render() {
        let { tagFriend, tagRoute, response, taggedFriends, taggedRoute, postingMedia } = this.state;
        if (response!= null){
            if(response.status == 201){
                this.setState({response: null, media: null, title: null, taggedFriends: [], taggedRoute: null, postingMedia: false})
                this.props.closeModal()
            } else {
                this.setState({response: null, postingMedia: false})
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
                            <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => this.props.closeModal() }>
                                <Icon size={40} color='firebrick' name='arrow-back'/>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.text}>Title</Text>
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
                                    currentlyTagged={taggedFriends}
                                    updateTagFriends={(tags) => this.setState({taggedFriends: tags})}
                                    closeFriends={() => this.setState({tagFriend: false})}/>
                                }
                                {tagRoute && 
                                    <TagRoute 
                                        currentlyTagged={taggedRoute}
                                        updateRouteTag={(id) => this.setState({taggedRoute: id})}
                                        closeRoute={() => this.setState({tagRoute: false})}
                                    />
                                }
                                
                                <Text style={styles.text}>Attach Media(Optional)</Text>
                                <MediaPicker 
                                    setCaption= {(caption) => this.setState({caption})} 
                                    propSetImage={(media) => this.setState({media})}
                                    deleteMedia={() => this.setState({media: null, caption: null})}
                                />

                                {postingMedia ? 
                                    <View style={{paddingTop: 20}}>
                                        <ActivityIndicator 
                                            style={{justifyContent: "center", alignItems: 'center'}}
                                            size="large" color="#0000ff"
                                        />
                                    </View>
                                :
                                    <View style={{paddingTop: 10}}>
                                        <Button
                                            title="Post!"
                                            onPress={() => this.handleSubmit()}
                                        />
                                    </View>
                                }
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
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
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