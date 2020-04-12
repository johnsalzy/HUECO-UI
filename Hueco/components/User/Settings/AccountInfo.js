// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    ActivityIndicator,
    TextInput,
} from "react-native";
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { fetchGet } from '../../../functions/api'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class AccountInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            data: this.props.data, // Should contain current user data
            loadingPage: true,
            errorImage: false,
            changes: false,
            profile_pic: this.props.data.profile.profile_picture,
            first_name: '',
            last_name: '',
            email: '',
            location: '',
            password: null,
            media: null,
        };
    }
    async saveUpdates(){
        let response = await fetchGet('users/me/')
        alert('res' + JSON.stringify(response))

    }
    componentDidMount() {
        this.getPermissionAsync();      // Get cameral roll perms

        // get all user info and set to check for changes later
        this.setState({
            orig_profile_pic: '',
            orig_first_name: '',
            orig_last_name: '',
            orig_email: '',
            orig_location: '',
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
        base64: true,
        });

        if (!result.cancelled) {
            this.setState({media: result, profile_pic: result.uri, changes: true });
        }
    };

    updateUserInfo(){
        let {username} = this.state;
        //Compare all info
        //Make headers/body
        //Call api route

        this.setState({changes: false})
    }

    render() {
        let { data, loadingPage, errorImage, profile_pic, changes } = this.state
        return (
            <View style={{alignSelf: 'center', width: '80%'}}>
                {data && 
                <View style={{width: '100%'}}>
                    <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', paddingTop: 5, fontWeight: 'bold'}}>Account Information</Text>
                    {/* Profile picture */}
                    <View style={styles.flexInRow}>
                        <View
                            style={{
                                marginTop: 20,
                                width: 150,
                                height: 150,
                                borderRadius: 1,
                                borderColor: 'black',
                                borderWidth: 1,
                                overflow: "hidden"
                            }}
                        >
                            {loadingPage && 
                                <ActivityIndicator 
                                    style={{width: '100%', height:'100%', justifyContent: "center", alignItems: 'center'}}
                                    size="large" color="#0000ff"
                                /> 
                            }
                            {errorImage && 
                                <Text style={{textAlign: 'center'}}>Could Not Load Image.</Text>
                            }
                            <Image 
                                source={{'uri': profile_pic}}
                                onLoad={() => this.setState({loadingPage: false})}
                                onError={() => this.setState({loadingPage: false, errorImage: true})}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
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
                                    placeholder={data.description}
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
                                    placeholder={data.location}
                                    placeholderTextColor="darkblue"
                                    onChangeText = {(location) => this.setState({location: location, changes: true})}
                                    value = {this.state.location}
                                />
                            </View>
                        </View>

                    </View>
                </View>
                }
                {changes && 
                    <TouchableOpacity onPress={()=> this.saveUpdates()} style={{paddingTop: 10, alignSelf: 'center', marginBottom: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'green'}}>Save Changes</Text>
                    </TouchableOpacity>
                }
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