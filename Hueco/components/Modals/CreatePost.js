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
import {connect} from 'react-redux';
import { showMessage } from "react-native-flash-message";

//Import Screens/Components/Styles
import Icon from '../../components/Ionicon';
import MediaPicker from '../ImagePicker';
import TagFriend from '../Tags/tagFriend';
import TagRoute from '../Tags/tagRoute';
import { fetchPostMedia } from '../../functions/api';




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
    async handleSubmit(){
        let {login, media, title, taggedFriends, taggedRoute } = this.state
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
        let response = await fetchPostMedia('post/', formdata)
        if(response.status == 201){
            this.setState({response: null, media: null, title: null, taggedFriends: [], taggedRoute: null, postingMedia: false})
            this.props.closeModal()
            showMessage({
                message: "Post Created!",
                type: "success",
                titleStyle: {fontWeight: 'bold', fontSize: 15},
                floating: true,
                icon: { icon: "success", position: "left" }
            })
        } else {
            this.setState({response: null, postingMedia: false})
            showMessage({
                message: "Failed To Create Post ):",
                type: "danger"
            })
        }
    }

    render() {
        let { tagFriend, tagRoute, taggedFriends, taggedRoute, postingMedia } = this.state;
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
                                    type={'all'}
                                    caption={true}
                                    display={true}
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