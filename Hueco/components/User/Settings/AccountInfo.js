// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from "react-native";
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import FlashMessage from "react-native-flash-message";

import { fetchPatchMedia } from '../../../functions/api'
import { updateUserProfile } from '../../../redux/actions'
import ImageWithLoader from '../../ImageWithLoader';


const mapStateToProps = state => (
    {
      login: state.login,
      user: state.user,
    }
)

class AccountInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            data: this.props.user.userProfile, // Should contain current user data
            changes: false,
            error_change: false,
            error_text: '',
            loadingChange: false,
            email: '',
            first_name: '',
            last_name: '',
            full_name: '',
            profile_picture: this.props.data.profile.profile_picture,
            location: '',
            description: '',
            media: null,
        };
    }
    async saveUpdates(){
        this.setState({loadingChange: true, error_change: false})
        let { data, media, first_name, last_name, email, location, description } = this.state;   // Get new data
        let {orig_first_name, orig_last_name, orig_description, orig_location, orig_email} = this.state; // Get originals to compare
        var formdata = new FormData();
        // ------------------ Validate all new data ------------------
        // If there is a error...
        // this.setState({error_change: 'true', error_text: 'Error...'})
        // Attach new first name
        if(first_name != '' && (first_name != orig_first_name)){
            formdata.append("first_name", first_name);
        }
        // Attach new last name
        if(last_name != '' && (last_name != orig_last_name)){
            formdata.append("last_name", last_name);
        }
        // Attach new email
        if(email != '' && (email != orig_email)){
            // Validate email
            formdata.append("email", email);
        }
        // Attach new description
        if(description != '' && (description != orig_description)){
            formdata.append("profile.description", description);
        }
        // Attach new description
        if(location != '' && (location != orig_location)){
            formdata.append("profile.location", location);
        }
        //Attach new media
        if(media){
            let uri = Platform.OS === "android" ? media.uri : media.uri.replace("file://", "")
            formdata.append("profile.profile_pic.media", {uri:uri, type:'image/jpeg', name:'fetchPost'});
            formdata.append("profile.profile_pic.media_type", media.type);
        }
        let apiRoute = 'users/' + data.id + '/'
        let response = await fetchPatchMedia(apiRoute, formdata)
        let message = ""
        let type = ""
        if(response.status == "User Updated"){
            message = "Account Info Updated!"
            type = "success"
            this.props.dispatch(updateUserProfile(true))
        } else {
            message = "Could not update user profile ):"
            type = "danger"
        }
        this.refs.localFlashMessage.showMessage({
            message: message,
            type: type,
            titleStyle: {fontWeight: 'bold', fontSize: 15},
            floating: true,
            icon: { icon: type, position: "left" }
        })
        this.setState({changes: false, loadingChange: false})

    }
    componentDidMount() {
        this.getPermissionAsync();      // Get cameral roll perms
        let {data} = this.state
        // get all user info and set to check for changes later
        this.setState({
            orig_profile_picture: data.profile.profile_picture,
            orig_first_name: data.first_name,
            orig_last_name: data.last_name,
            orig_description: data.profile.description,
            orig_email: data.profile.email, // Waiting on api route
            orig_location: data.profile.location,
        })
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,  // 0-1(max)
        });

        if (!result.cancelled) {
            this.setState({media: result, profile_picture: result.uri, changes: true });
        }
    };


    render() {
        let { data, profile_picture, error_change, changes, loadingChange } = this.state
        return (
            <View style={{alignSelf: 'center', width: '80%'}}>
                {data && 
                <View style={{width: '100%'}}>
                    <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', paddingTop: 5, fontWeight: 'bold'}}>Account Information</Text>
                    {/* Profile picture */}
                    <View style={styles.flexInRow}>
                        <View
                            style={{
                                marginTop: 25,
                                width: 160,
                                height: 160,
                                borderRadius: 1,
                                borderColor: 'black',
                                borderWidth: 1,
                                overflow: "hidden"
                            }}
                        >
                            <ImageWithLoader uri={profile_picture}/>
                        </View>
                        <View>
                        </View>
                        <View style={{height: '100%', alignContent: 'flex-end'}}>
                            <TouchableOpacity 
                                onPress={() => this._pickImage()}
                                style={{
                                    position: 'absolute', bottom: 20, left: 10,
                                    backgroundColor: 'dodgerblue', borderRadius: 4, 
                                    justifyContent: 'center', marginLeft: '2%', 
                                    paddingLeft: 10, paddingRight: 10, height: 50
                                }}
                            >
                                <Text style={{color: 'white', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold'}}>Change Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Personal Info */}
                    <View style={{padding: 5, width: '100%'}}>
                        <Text style={styles.headerText}>Account Information</Text>

                        <View style={styles.flexInRow}>
                            <Text style={styles.accountInfo}>First Name</Text>
                            <View style={{width: 200}}>
                                <TextInput 
                                    style={styles.text_input} 
                                    placeholder={data.first_name}
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(first_name) => this.setState({first_name: first_name, changes: true})}
                                    value = {this.state.first_name}
                                />
                            </View>
                        </View>
                        <View style={styles.flexAndPadding}>
                            <Text style={styles.accountInfo}>Last Name</Text>
                            <View style={{width: 200}}>
                                <TextInput 
                                    style={styles.text_input} 
                                    placeholder={data.last_name}
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(last_name) => this.setState({last_name: last_name, changes: true})}
                                    value = {this.state.last_name}
                                />
                            </View>
                        </View>
                        <View style={styles.flexAndPadding}>
                            <Text style={styles.accountInfo}>E-mail</Text>
                            <View style={{width: 200}}>
                                <TextInput 
                                    style={styles.text_input} 
                                    placeholder={data.email}
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(email) => this.setState({email: email, changes: true})}
                                    value = {this.state.email}
                                />
                            </View>
                        </View>
                        {/* User Information */}
                        <Text style={styles.headerText}>User Information</Text>
                        <View style={styles.flexInRow}>
                            <Text style={styles.accountInfo}>Description</Text>
                            <View style={{width: 200}}>
                                <TextInput 
                                    style={styles.text_input} 
                                    placeholder={data.profile.description}
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(description) => this.setState({description: description, changes: true})}
                                    value = {this.state.description}
                                />
                            </View>
                        </View>
                        <View style={styles.flexAndPadding}>
                            <Text style={styles.accountInfo}>Location</Text>
                            <View style={{width: 200}}>
                                <TextInput 
                                    style={styles.text_input} 
                                    placeholder={data.profile.location}
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(location) => this.setState({location: location, changes: true})}
                                    value = {this.state.location}
                                />
                            </View>
                        </View>

                    </View>
                </View>
                }
                {error_change && <Text style={{color: 'red', fontWeight: "bold", textAlign: 'center'}}></Text>}
                {changes && 
                    <View>
                        { loadingChange ?
                            <ActivityIndicator animating size={'large'}/>
                        :
                            <TouchableOpacity onPress={()=> this.saveUpdates()} style={{paddingTop: 10, alignSelf: 'center', marginBottom: 10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'green'}}>Save Changes</Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
                }
                <FlashMessage ref="localFlashMessage"/>
            </View>
        );
    }
}
export default connect(mapStateToProps)(AccountInfo);


const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold', 
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 5,
        color: 'darkgray'
    },
    text_input: {
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 4,
        width: '100%',
        paddingLeft: 10,
        padding: 2
    },
    accountInfo: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
        width: '40%'
    },
    flexInRow: {
        flexDirection: 'row',
    },
    flexAndPadding: {
        flexDirection: 'row',
        marginTop: 10,
    }
});