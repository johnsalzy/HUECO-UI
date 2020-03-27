import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

//Redux imports
import {connect} from 'react-redux';
import { logoutUser } from '../redux/actions'

const mapStateToProps = state => (
  {
  login: state.login
  }
)

class Profile extends Component {
  state = {
    username: this.props.login.username,
    access_token: this.props.login.access_token,
  }

  
  render(){
    const username = this.state.username
    const access_token = this.state.access_token

    return (
        <ScrollView>
            <View style={{paddingTop: 10, alignItems: 'center'}}>
              <Text>Welcome to Heuco!!</Text>
              <Text style = {{color:'blue', fontSize: 15}}>Username:  {username} </Text>
              <Text style = {{color:'green', fontSize: 15}}>access_token:  {access_token} </Text>
              <Text>Photo </Text>
              <Text>Hello!!</Text>
              <Text>Hello!!</Text>
              <Text>Hello!!</Text>
              <Text>Hello!!</Text>

              <TouchableOpacity onPress={()=> this.props.dispatch(logoutUser(this.state.username))} style={{paddingTop: 20}}>
                <Text style={{color: 'red'}}>Logout</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>


    );
  }
}
export default connect(mapStateToProps)(Profile)






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
