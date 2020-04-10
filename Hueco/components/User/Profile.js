// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

import Icon from '../Ionicon';
import UserStatView from '../UserStatView';
import Settings from './Settings'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            data: this.props.data,
            myProfile: false,
            baseAPI: 'http://3.133.123.120:8000/api/v1/',
            userData: null,
            is_following: null,
            profileDataLoaded: false,
            settingModalVisable: false,
            profile_pic_loaded: false,
        };
    }
    async loadUserData(apiRoute){
        let {login, baseAPI} = this.state;
        await fetch(baseAPI + "users/" + apiRoute, {
        headers: {
            'Authorization': 'Bearer ' + login.access_token,
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({profileDataLoaded: true, userData: responseData, is_following: responseData.profile.is_following})
        })
        .catch((err) => alert('error in fetch' + err))
        .done();
    }


    followUser(id){
        let { login, baseAPI, is_following } = this.state;
        fetch(baseAPI + 'social/follow/?id=' + id, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              "Authorization": "Bearer " + login.access_token,
              'Content-Type': 'application/json',
            }
          })
          .then(() => this.setState({is_following: !is_following}))
          .catch();
    }
    componentDidMount(){
        let apiRoute = ''
        let { data, login } = this.state
        // Check if is me
        if(login.username == data.username){
            this.setState({myProfile: true})
            apiRoute = 'me/'
        }else {
            apiRoute = data.id
        }
        this.loadUserData(apiRoute)
    }
    render() {
        let { myProfile, userData, is_following, settingModalVisable, profile_pic_loaded} = this.state

        return (
            <View>
                {userData ? 
                    <View>
                        <View style={styles.profile_pic}>
                            {! profile_pic_loaded &&
                                <View style={{position: 'absolute', top: windowHeight*.35}}>
                                    <ActivityIndicator size="large" color="#0000ff"/>
                                </View>
                            }
                            <Image 
                                style={{
                                    width: '100%', 
                                    height: '100%', 
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}
                                source={{uri: userData.profile.profile_picture}}
                                onLoad={() => this.setState({profile_pic_loaded: true})}
                                onError={() => this.setState({profile_pic_loaded: true})}
                            />
                        </View>
                        <View style={{paddingTop: 5, alignItems: 'center',}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.name}> {userData.first_name + ' ' + userData.last_name}</Text>
                                {myProfile ? 
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                                    <TouchableOpacity onPress={() => this.setState({settingModalVisable: true})}>
                                        <Icon name={'settings'} color={'gray'} size={20}/>
                                    </TouchableOpacity>
                                </View>
                                : 
                                // Need to do only one, waiting on userData from API
                                
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flexDirection: 'row'}}>
                                    {is_following ? 
                                    <TouchableOpacity onPress={() => this.followUser(userData.id)}>
                                        <Text style={styles.unFollowButton}>UnFollow</Text>
                                    </TouchableOpacity>
                                    : 
                                    <TouchableOpacity onPress={() => this.followUser(userData.id)}>
                                        <Text style={styles.followButton}>Follow</Text>
                                    </TouchableOpacity> 
                                    }
                                    
                                    
                                </View>
                                }
                            </View>
                            {userData.profile.description &&
                                <View style={styles.flexInRow}>
                                    <Icon name='description' /><Text style={styles.userInfo}> {userData.profile.description}</Text>
                                </View>
                            }
                            <View style={styles.flexInRow}>
                                <Icon name='stars' /><Text style={styles.userInfo}> {'King Beta Sprayer'} </Text>
                            </View>
                            <View style={styles.flexInRow}>
                                <Icon name='event' /><Text style={styles.userInfo}> {userData.date_joined.split('T')[0]} </Text>
                            </View>
                            <View style={styles.flexInRow}>
                                <Tooltip popover={<Text>Followers</Text>}>
                                    <View style={styles.flexInRow}>
                                        <Icon name='people' /><Text style={styles.userInfo}> {userData.profile.followers} </Text>
                                    </View>
                                </Tooltip>
                                <Text> </Text>
                                <Tooltip popover={<Text>Following</Text>}>
                                    <View style={styles.flexInRow}>
                                        <Icon name='search' /><Text style={styles.userInfo}> {userData.profile.following} </Text>
                                    </View>
                                </Tooltip>
                            </View>
                            {userData.profile.location &&
                                <View style={styles.flexInRow}>
                                    <Icon name='place' /><Text style={styles.userInfo}> {userData.profile.location}</Text>
                                </View>
                            }
                            
                            <Tooltip popover={<Text>Total Sends</Text>}>
                                <View style={styles.flexInRow}>
                                <Icon name='timeline' /><Text style={styles.userInfo}> {userData.profile.sends} </Text>
                                </View>
                            </Tooltip>
                            
                            {/* End of profile view, start of stats view */}
                            <UserStatView idUser={userData.id}/>
                        </View>
                    </View>
                :
                    <View style={{paddingTop: 20, paddingBottom: 20}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
                

                {/* Settigs Modal */}
                {(myProfile && settingModalVisable) && 
                    <Settings 
                        modalVisable={settingModalVisable} 
                        close={() => this.setState({settingModalVisable: false})} 
                        data={userData}
                    />
                }
            </View>
        );
    }
}
export default connect(mapStateToProps)(Profile);
// export default UserViewModal;

const styles = StyleSheet.create({
    profile_pic: {
        width: '100%',
        height: windowHeight*.7,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottomWidth: 2, 
        borderBottomColor: 'black'
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
    },
    flexInRow: {
        flexDirection: 'row',
        paddingTop: '1%',
        paddingBottom: '1%',
    },
    unFollowButton: {
        color: 'red',
        padding: 5,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
    },
    followButton: {
        color: 'green',
        padding: 5,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
    }
});