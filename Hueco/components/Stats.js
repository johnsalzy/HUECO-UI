import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {connect} from 'react-redux';


import { logoutUser, updateProfile, clearProfile } from '../redux/actions'

const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user
  }
)

class Stats extends Component {
  constructor(props){
    super(props);
    this.state= {
      username: this.props.login.username,
      access_token: this.props.login.access_token,
      userData: this.props.user,
    }
  }

  render(){
    alert('this.state render' + JSON.stringify(this.state))
    return (
        <View>
            <Text>Selected is stat Page</Text>
        </View>
    );
  }
}
export default connect(mapStateToProps)(Stats)
