import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import UserStatView from '../components/UserStatView';
import { logoutUser, updateProfile, clearProfile } from '../redux/actions'

const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user
  }
)

class Profile extends Component {
  constructor(props){
    super(props);
    this.state= {
      username: this.props.login.username,
      access_token: this.props.login.access_token,
      userData: this.props.user,
      profileDataLoaded: false,
      userData2: {date_joined: '', profile: { sends: 0, first_name: "", last_name:"", profile_pic: "https://www.facebook.com/ProfilePictures/photos/a.466471457743/10154888128487744/?type=1&theater"}}
    }
  }

  componentDidMount(){
    this.loadUserData()
  }


  loadUserData(){
    try {
      //Assign the promise unresolved first then get the data using the json method. 
      // const aboutApiCall = await fetch('https://salzyjohn.pythonanywhere.com/AboutUs');
      fetch("http://3.133.123.120:8000/api/v1/users/me", {
        headers: {
            'Authorization': 'Bearer ' + this.state.access_token,
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
          // alert('test' + JSON.stringify(responseData))
          this.setState({profileDataLoaded: true, userData2: responseData})
          this.props.dispatch(updateProfile(responseData))
      })
      .done();
      
    } catch(err) {
        alert("Error with data -----------" + err);
    }
  }



  logoutUser(){
    this.props.dispatch(logoutUser(this.state.username))
    this.props.dispatch(clearProfile(this.state.username))
    this.setState({profileDataLoaded: false})
  }

  
  render(){
    // alert('test' + JSON.stringify(this.state.userData))
    return (
        <ScrollView>
            <View style={{paddingTop: 10, alignItems: 'center'}}>
              <View style={styles.container}>
                  <View style={{backgroundColor: "#EBEBEB", paddingTop: '4%', verticalAlign: 'center', justifyContent: 'center'}}>
                      <View style={styles.headerContent, {flex: 1, flexDirection: "row", alignItems: 'center'}}>
                        
                        <View style={{alignItems: 'center', alignContent: "center", paddingLeft: "2%",width:"58%"}}>
                          <Image style={styles.avatar}
                              source={{uri: this.state.userData2.profile.profile_pic}}
                          />
                        </View>

                        <View>
                          <View style={styles.flexInRow}><Text style={styles.userStats}>Following: </Text><Text style={styles.userStats}>{this.state.userData2.profile.following}</Text></View>
                          <View style={styles.flexInRow}><Text style={styles.userStats}>Followers: </Text><Text style={styles.userStats}>{this.state.userData2.profile.followers}</Text></View>
                          <View style={styles.flexInRow}><Text style={styles.userStats}>Sends: </Text><Text style={styles.userStats}>{this.state.userData2.profile.sends}</Text></View>
                        </View>
                      </View>

                      <View style={{alignItems: "center", alignContent: "center", paddingBottom: "5%", justifyContent: 'center'}}>
                          <Text style={styles.name}>{this.state.userData2.first_name + ' ' + this.state.userData2.last_name} </Text>
                          <View style={styles.flexInRow}>
                          <Icon name='stars' /><Text style={styles.userInfo}> {'King Beta Sprayer'} </Text>
                          </View>
                          <View style={styles.flexInRow}>
                            <Icon name='event' /><Text style={styles.userInfo}> {this.state.userData2.date_joined.split('T')[0]} </Text>
                          </View>
                          <View style={styles.flexInRow}>
                            <Icon name='place' /><Text style={styles.userInfo}> {this.state.userData2.profile.location}</Text>
                          </View>
                          <TouchableOpacity onPress={()=> this.logoutUser()}>
                            <Text style={{color: 'red'}}>Logout</Text>
                          </TouchableOpacity>
                      </View>


                  </View>
              </View>
            </View>
            {/* End of profile view, start of stats view */}

            {/* <UserStatView />  Temp disabled till matthew does some API work for a change */}
        </ScrollView>


    );
  }
}
export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({

  //   For Profile
    container: {
      flex: 1,
      alignSelf: 'stretch',
      paddingTop: '1%',
    },
    headerContent:{
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "#d6cf94",
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
    userStats: {
      fontSize: 18,
      fontWeight: 'bold',
    }
  
  });