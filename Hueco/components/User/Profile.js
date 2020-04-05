// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

import Icon from '../Ionicon';

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
            
        };
    }
    followUser(id, type){
        if(type){
            alert('following user: ' + id)
        } else {
            alert('unfollowing user: ' + id)
        }
    }
    settings(){
        alert('my settings')
    }
    componentDidMount() {
        let { data, login } = this.state
        // Check if is me
        let my_username = login.username
        if(my_username == data.username){
            this.setState({myProfile: true})
        }   
    }
    render() {
        let { data, myProfile} = this.state
        return (
            <View>
            <View style={{alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: 'black'}}>
                <Image 
                    style={styles.profile_pic}
                    source={{uri: data.profile.profile_picture}}
                />
            </View>
            <View style={{paddingTop: 5, alignItems: 'center',}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name}> {data.first_name + ' ' + data.last_name}</Text>
                    {myProfile ? 
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                        <TouchableOpacity onPress={() => this.settings()}>
                            <Icon name={'settings'} color={'gray'} size={20}/>
                        </TouchableOpacity>
                    </View>
                    : 
                    // Need to do only one, waiting on data from API
                    
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flexDirection: 'row'}}>
                        {data.profile.is_following ? 
                        <TouchableOpacity onPress={() => this.followUser(data.id)}>
                            <Text style={styles.followButton}>Follow</Text>
                        </TouchableOpacity> 
                        : 
                        <TouchableOpacity onPress={() => this.followUser(data.id)}>
                            <Text style={styles.unFollowButton}>UnFollow</Text>
                        </TouchableOpacity>
                        }
                        
                        
                    </View>
                    }
                </View>
                {data.profile.description &&
                    <View style={styles.flexInRow}>
                        <Icon name='description' /><Text style={styles.userInfo}> {data.profile.description}</Text>
                    </View>
                }
                <View style={styles.flexInRow}>
                    <Icon name='stars' /><Text style={styles.userInfo}> {'King Beta Sprayer'} </Text>
                </View>
                <View style={styles.flexInRow}>
                    <Icon name='event' /><Text style={styles.userInfo}> {data.date_joined.split('T')[0]} </Text>
                </View>
                <View style={styles.flexInRow}>
                    <Tooltip popover={<Text>Followers</Text>}>
                        <View style={styles.flexInRow}>
                            <Icon name='people' /><Text style={styles.userInfo}> {data.profile.followers} </Text>
                        </View>
                    </Tooltip>
                    <Text> </Text>
                    <Tooltip popover={<Text>Following</Text>}>
                        <View style={styles.flexInRow}>
                            <Icon name='search' /><Text style={styles.userInfo}> {data.profile.following} </Text>
                        </View>
                    </Tooltip>
                </View>
                {data.profile.location &&
                    <View style={styles.flexInRow}>
                        <Icon name='place' /><Text style={styles.userInfo}> {data.profile.location}</Text>
                    </View>
                }
                
                <Tooltip popover={<Text>Total Sends</Text>}>
                    <View style={styles.flexInRow}>
                    <Icon name='timeline' /><Text style={styles.userInfo}> {data.profile.sends} </Text>
                    </View>
                </Tooltip>
                
            </View>
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