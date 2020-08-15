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
import FlashMessage from "react-native-flash-message";
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
            tagFriend: true,
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
            this.refs.localFlashMessage.showMessage({
                message: "Please Enter a Title For Your Post",
                type: "warning",
                titleStyle: {fontWeight: 'bold', fontSize: 15},
                floating: true,
                icon: { icon: "warning", position: "left" }
            })
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
                    onRequestClose={() => this.props.closeModal()}
                >
                    <View style={styles.container}>
                        <ScrollView>
                            <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => this.props.closeModal() }>
                                <Icon size={40} color='firebrick' name='arrow-back'/>
                            </TouchableOpacity>
                            <View>
                                <View style={styles.addTitle}>
                                    <Text style={styles.text}>Post Title</Text>
                                    <TextInput style={styles.text_input} 
                                        placeholder='Sent this sick v5 today...'
                                        placeholderTextColor="darkblue"
                                        onChangeText = {(title) => this.setState({title})}
                                        value = {this.state.title}
                                    />
                                </View>
                                {/* Page Navigation */}
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <TouchableOpacity style={{alignItems: 'flex-start'}} onPress={() => this.setState({tagFriend: !tagFriend, tagRoute: false})}>
                                        <Icon size={32} color='dodgerblue' name='person-add'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignItems: 'flex-start'}} onPress={() => this.setState({tagRoute: !tagRoute, tagFriend: false})}>
                                        <Icon size={32} color='dodgerblue' name='map'/>
                                    </TouchableOpacity>
                                    <View>
                                        <MediaPicker 
                                            type={'all'}
                                            caption={true}
                                            display={true}
                                            setCaption= {(caption) => this.setState({caption})} 
                                            propSetImage={(media) => this.setState({media})}
                                            deleteMedia={() => this.setState({media: null, caption: null})}
                                        />
                                    </View>
                                </View>

                                {/* Tag a Friend */}
                                {tagFriend && 
                                    <View>
                                        <Text style={styles.text}>Tag Friends</Text>
                                        <TagFriend 
                                            showMessage={(type, message) =>
                                                this.refs.localFlashMessage.showMessage({
                                                    message: message,
                                                    type: type,
                                                    titleStyle: {fontWeight: 'bold', fontSize: 15},
                                                    floating: true,
                                                    icon: { icon: type, position: "left" }
                                                })
                                            }
                                            currentlyTagged={taggedFriends}
                                            updateTagFriends={(tags) => this.setState({taggedFriends: tags})}
                                            // closeFriends={() => this.setState({tagFriend: false, })}
                                        />
                                    </View>
                                }
                                

                                {/* Tag a Route */}
                                
                                {tagRoute && 
                                    <View>
                                        <Text style={styles.text}>Tag A Route</Text>
                                        <TagRoute 
                                            showMessage={(type, message) =>
                                                this.refs.localFlashMessage.showMessage({
                                                    message: message,
                                                    type: type,
                                                    titleStyle: {fontWeight: 'bold', fontSize: 15},
                                                    floating: true,
                                                    icon: { icon: type, position: "left" }
                                                })
                                            }
                                            currentlyTagged={taggedRoute}
                                            updateRouteTag={(id) => this.setState({taggedRoute: id})}
                                            // closeRoute={() => this.setState({tagRoute: false})}
                                        />
                                    </View>
                                }
                                
                                

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
                    <FlashMessage ref="localFlashMessage"/>
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
        // backgroundColor: 'lightskyblue',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 10,
    },
    addTitle: {
        paddingBottom: 10
    }
});