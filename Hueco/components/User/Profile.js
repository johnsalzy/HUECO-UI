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
import Settings from './Settings/Settings'
import { fetchGet, fetchPost } from '../../functions/api'

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
            propsData: this.props.data,
            type: this.props.type,
            data: null,
            mine: false,
            settingModalVisable: false,
            pic_loaded: false,
        };
    }
    async loadData(apiRoute){
        let response = await fetchGet(apiRoute)
        this.setState({data: response})
    }


    followUser(id){
        let { data } = this.state;
        fetchPost('social/follow/?id=' + id)
        //Flip following state
        data.profile.is_following = !data.profile.is_following;
        this.setState({data})
    }
    componentDidMount(){
        
        let apiRoute = ''
        let { propsData, login, type } = this.state
        // Check if is me
        if(type == 'user'){
            if(login.id == propsData.id){
                this.setState({mine: true})
            }
            apiRoute = propsData.id + '/'
            this.loadData('users/' + apiRoute)
        } else {
            //Fetch route data

            //Check if it is the users route

        }
    }
    render() {
        let { mine, data, settingModalVisable, pic_loaded} = this.state
        return (
            <View>
                {data && 
                    <View>
                        <View style={styles.profile_pic}>
                            {! pic_loaded &&
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
                                source={{uri: data.profile.profile_picture}}
                                onLoad={() => this.setState({pic_loaded: true})}
                                onError={() => this.setState({pic_loaded: true})}
                            />
                        </View>
                    </View>
                }
                {data ? 
                        <View style={{paddingTop: 5, alignItems: 'center',}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.name}> {data.first_name + ' ' + data.last_name}</Text>
                                {mine ? 
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                                    <TouchableOpacity onPress={() => this.setState({settingModalVisable: true})}>
                                        <Icon name={'settings'} color={'gray'} size={20}/>
                                    </TouchableOpacity>
                                </View>
                                : 
                                // Need to do only one, waiting on data from API
                                
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flexDirection: 'row'}}>
                                    {data.profile.is_following ? 
                                    <TouchableOpacity onPress={() => this.followUser(data.id)}>
                                        <Text style={styles.unFollowButton}>UnFollow</Text>
                                    </TouchableOpacity>
                                    : 
                                    <TouchableOpacity onPress={() => this.followUser(data.id)}>
                                        <Text style={styles.followButton}>Follow</Text>
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
                            
                            {/* End of profile view, start of stats view */}
                            <UserStatView idUser={data.id}/>
                        </View>
                :
                    <View style={{paddingTop: 20, paddingBottom: 20}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        {mine && 
                            <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                                <TouchableOpacity onPress={() => this.setState({settingModalVisable: true})}>
                                    <Icon name={'settings'} color={'gray'} size={20}/>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                }
                

                {/* Settigs Modal */}
                {(mine && settingModalVisable) && 
                    <Settings 
                        modalVisable={settingModalVisable} 
                        close={() => this.setState({settingModalVisable: false})} 
                        data={data}
                    />
                }
            </View>
        );
    }
}
export default connect(mapStateToProps)(Profile);

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