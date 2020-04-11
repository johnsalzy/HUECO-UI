import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import ProfileView from '../components/User/Profile';


const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user
  }
)


class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state= {
      id: this.props.login.id,
    }
  }

  render(){
    let data = {id: this.state.id}
    return (
        <ScrollView>
            <View>
              <View style={styles.containerProfile}>
                <ProfileView data={data} />
              </View>
            </View>
        </ScrollView>


    );
  }
}
export default connect(mapStateToProps)(ProfileScreen)

const styles = StyleSheet.create({
  containerProfile: {
      width: '100%',
  },
});