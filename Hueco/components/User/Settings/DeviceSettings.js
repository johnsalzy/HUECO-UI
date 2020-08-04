// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Modal,
    Text,
    TouchableOpacity,
    Switch,
} from "react-native";
import {connect} from 'react-redux';

import { titles } from '../../../assets/styles/text'
import { registerForPushNotificationsAsync } from '../../Notifications/getPermission';
const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class DeviceSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile_private: false,
            notifications_enabled: false,
            notifications_sound: false,
            changesPresent: false,
        };
    }
    async enableNotifications(){
        let { notifications_enabled } = this.state;
        if(notifications_enabled){
            this.setState({notifications_enabled: false})
        } else {
            let response = await registerForPushNotificationsAsync()
            if(response.expoPushToken){ this.setState({expoPushToken: response.expoPushToken, notifications_enabled: true, changesPresent: true})}
            else{this.setState({notifications_enabled: false, changesPresent: true})}
        }
    }



    render() {
        let {profile_private, notifications_enabled, notifications_sound, changesPresent} = this.state;
        return (
            <ScrollView style={{width: '100%', height: '100%', }}>
                <View style={{ alignSelf: 'center', width: '80%'}}>
                    <Text style={titles.page_header}>User Settings</Text>

                    {/* <View style={{paddingVertical: 10}}>
                        <Text style={titles.titleDivider}>Profile</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
                            <Text style={{width: '40%'}}>Private</Text>
                            <Switch
                                style = {{width: '60%'}}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={profile_private ? "#2239e3" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.setState({profile_private: !profile_private,})}
                                value={profile_private}
                            />
                        </View>
                    </View> */}

                    <View style={{paddingVertical: 10}}>
                        <Text style={titles.titleDivider}>Notifications</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
                            <Text style={{width: '40%'}}>Enabled</Text>
                            <Switch
                                style = {{width: '60%'}}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={notifications_enabled ? "#2239e3" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.enableNotifications()}
                                value={notifications_enabled}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
                            <Text style={{width: '40%'}}>Sound</Text>
                            <Switch
                                style = {{width: '60%'}}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={notifications_sound ? "#2239e3" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.setState({notifications_sound: !notifications_sound, changesPresent: true})}
                                value={notifications_sound}
                            />
                        </View>
                    </View>

                    {/* Save Changes */}
                    { changesPresent &&
                        <TouchableOpacity onPress={()=> this.saveUpdates()} style={{paddingTop: 10, alignSelf: 'center', marginBottom: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'green'}}>Save Changes</Text>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(DeviceSettings);