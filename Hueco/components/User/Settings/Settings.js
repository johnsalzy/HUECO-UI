// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Dimensions,
    Modal,
    Text,
    TouchableOpacity,
} from "react-native";
import {connect} from 'react-redux';

import { logoutUser, clearProfile } from '../../../redux/actions'
import AccountInfo from './AccountInfo';
import Achievements from './Achievements';
import DeviceSettings from './DeviceSettings';
import Icon from '../../Ionicon';
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'
import { fetchLogout, fetchPost } from "../../../functions/api";
const sideBarIconColor = 'dodgerblue'

const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data, // Should contain current user data
            target: 'account',
        };
    }
    async logoutUser(){
        let resposne = await fetchLogout('auth/revoke-token/')
        this.props.dispatch(logoutUser(this.state.username))
        this.props.dispatch(clearProfile(this.state.username))
        this.setState({profileDataLoaded: false})
        this.props.close()
    }

    render() {
        let { target, data } = this.state
        return (
            <Modal
                animationType="slide"
                visible={this.props.modalVisable}
            >
                <View style={{...ifIphoneX({marginTop: 30})}}>
                    <ScrollView style={{width: '100%', height: '100%', }}>
                        {target == 'account' && 
                            <AccountInfo data={data}/>
                        }
                        {target == 'achievement' &&
                            <Achievements user_id={data.id}/>
                        }
                        {target == 'world' &&
                            <View style={{ alignItems: 'center', width: '100%'}}>
                                <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>Your Places</Text>
                                <Text>Places You've Climbed</Text>
                                <Text>Coming Soon...</Text>
                            </View>
                        }
                        {target == 'group' &&
                            <View style={{ alignItems: 'center', width: '100%'}}>
                                <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>Groups</Text>
                                <Text>Your Send Groups</Text>
                                <Text>Send Group: Top Tier Bouldering</Text>
                                <Text>Members: @john @matt @emilyrocks</Text>
                                <Text>Chats</Text>
                                <Text>Coming Soon...</Text>
                            </View>
                        }
                        {target == 'settings' &&
                            <DeviceSettings />
                        }
                        {/* Logout Button */}
                        <View style={{alignSelf: 'center'}}>
                            <TouchableOpacity
                                onPress={() => this.logoutUser()}
                            >
                                <Text
                                    style={{color: 'red', fontSize: 20, textAlign: 'center', paddingVertical: 20}}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    {/* Side bar to change views */}
                    <View style={{
                        backgroundColor: 'gainsboro', position: 'absolute', 
                        padding: 3, borderRadius: 5,
                        top: 70, left: 0, flexDirection: 'column'}}>
                        <TouchableOpacity 
                            onPress={() => this.setState({target: 'account'})}
                        >
                            <Icon size={30} name={'account-circle'} color={sideBarIconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.setState({target: 'achievement'})}
                        >
                            <Icon size={30} name={'stars'} color={sideBarIconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.setState({target: 'world'})}
                        >
                            <Icon size={30} name={'public'} color={sideBarIconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.setState({target: 'group'})}
                        >
                            <Icon size={30} name={'group'} color={sideBarIconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.setState({target: 'settings'})}
                        >
                            <Icon size={30} name={'settings'} color={sideBarIconColor}/>
                        </TouchableOpacity>
                    </View>
                    {/* To close the modal */}
                    <TouchableOpacity 
                        onPress={() => this.props.close()}
                        style={{marginRight: 'auto', position: 'absolute', }}
                    >
                        <Icon name={'arrow-back'} size={50} color={'firebrick'}/>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}
export default connect(mapStateToProps)(Settings);