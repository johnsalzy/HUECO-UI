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
import { Tooltip, Rating } from 'react-native-elements';

import Icon from '../Ionicon';
import StatView from '../UserStatView';
import Settings from './Settings/Settings';
import AddTickModal from '../Modals/CreateTick';
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
            tickModal: false,
            pic_loaded: false,
        };
    }

    followUser(id){
        let { data } = this.state;
        fetchPost('social/follow/?id=' + id)
        //Flip following state
        data.profile.is_following = !data.profile.is_following;
        this.setState({data})
    }
    async componentDidMount(){
        
        let apiRoute = ''
        let { propsData, login, type } = this.state
        // Check if is me
        if(type == 'user'){
            if(login.id == propsData.id){
                this.setState({mine: true})
                apiRoute = 'me/'
            } else {
                apiRoute = propsData.id + '/'
            }
            let response = await fetchGet('users/' + apiRoute)
            this.setState({data: response})
        } else {
            let response = await fetchGet('routes/' + propsData.id + '/')
            let data = {
                full_name: null, date_joined: null, 
                stars: null, setter: null, id: null,
                rating: null, route_type: null,
                pitches: null, wall: null,
                profile: 
                    {
                        profile_picture: null, 
                        description: null, sends: 10
                    }
            }
            data.id = response.id;
            data.profile.profile_picture = response.img_url;
            data.full_name = response.name;
            data.rating = response.rating;
            data.stars = response.stars;
            data.setter = response.setter;
            data.wall = response.wall;
            data.route_type = response.route_type;
            data.pitches = response.pitches;
            data.date_joined = response.set_date;
            this.setState({data});
            //Check if user owns the route
        }
    }
    render() {
        let { mine, data, settingModalVisable, tickModal, pic_loaded, type } = this.state
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
                                <Text style={styles.name}> {data.full_name}</Text>
                                {mine ? 
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                                        <TouchableOpacity onPress={() => this.setState({settingModalVisable: true})}>
                                            <Icon name={'settings'} color={'black'} size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                : 
                                <View>
                                {type == 'user' ?
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
                                    :
                                    <View style={{justifyContent: 'center', paddingLeft: 5, alignItems: 'center'}}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({tickModal: true})}
                                            style={{justifyContent: 'center'}}
                                        >
                                            <Text style={styles.followButton}>Add Tick</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                </View>
                                
                                }
                            </View>
                            <View style={{alignSelf: 'center', width: '70%', alignItems: 'center'}}>
                                {type == 'route' &&
                                    <View style={styles.flexInRow}>
                                        <Text style={styles.userInfo}>Rating: </Text>
                                        <Rating
                                        type='star'
                                        ratingCount={5}
                                        imageSize={16}
                                        readonly
                                        startingValue={data.stars}
                                        style={{justifyContent: 'center'}}
                                        />
                                    </View>
                                }
                                {data.profile.description &&
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='description' color={'cornflowerblue'}/>
                                        <Text style={styles.userInfo}> {data.profile.description}</Text>
                                    </View>
                                }
                                {type == "user" && 
                                    <View style={styles.flexInRow}>
                                        <Icon name='stars' color={'cornflowerblue'}/>
                                        <Tooltip popover={<Text>{data.profile.achievement.desc}</Text>}>
                                            <Text style={styles.userInfo}> {data.profile.achievement.name} </Text>
                                        </Tooltip>
                                    </View>
                                }
                                <View style={styles.flexInRow}>
                                    <Icon name='event' color={'cornflowerblue'}/><Text style={styles.userInfo}> {data.date_joined} </Text>
                                </View>
                                {data.profile.location &&
                                    <View style={styles.flexInRow}>
                                        <Icon name='place' color={'cornflowerblue'}/><Text style={styles.userInfo}> {data.profile.location}</Text>
                                    </View>
                                }
                                {/* Followers/Following */}
                                {type == 'user'  && 
                                    <View style={styles.flexInRow}>
                                        <Tooltip popover={<Text>Followers</Text>}>
                                            <View style={styles.flexInRow}>
                                                <Icon color={'cornflowerblue'} name='people' />
                                                <Text style={styles.userInfo}> {data.profile.followers} </Text>
                                            </View>
                                        </Tooltip>
                                        <Text> </Text>
                                        <Tooltip popover={<Text>Following</Text>}>
                                            <View style={styles.flexInRow}>
                                                <Icon color={'cornflowerblue'} name='search' />
                                                <Text style={styles.userInfo}> {data.profile.following} </Text>
                                            </View>
                                        </Tooltip>
                                    </View>
                                }
                                {type == 'route' &&
                                    <View>
                                        <Text style={styles.userInfo}>Wall: {data.wall.name}</Text>
                                        <Text style={styles.userInfo}>Grade: {data.rating}</Text>
                                        <Text style={styles.userInfo}>Type: {data.route_type}</Text>
                                        {data.pitches && (data.pitches > 1) && <Text style={styles.userInfo}>Pitches: {data.pitches}</Text>}
                                        
                                    </View>
                                }
                                {/* Sends count */}
                                <Tooltip popover={<Text>Total Sends</Text>}>
                                    <View style={styles.flexInRow}>
                                    <Icon name='timeline' color={'cornflowerblue'}/><Text style={styles.userInfo}> {data.profile.sends} </Text>
                                    </View>
                                </Tooltip>
                            </View>
                            {/* End of profile view, start of stats view */}
                            <StatView type={type} id={data.id}/>
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
                {tickModal && 
                    <AddTickModal 
                        modalVisible={tickModal}
                        closeModal={() => this.setState({tickModal: false})} 
                        data={{id: data.id, name: data.full_name, wall: data.wall.name}}
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
        textAlign: 'center'
    },
    flexInRow: {
        flexDirection: 'row',
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
        color: 'white',
        padding: 5,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
    }
});