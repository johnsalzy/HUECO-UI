import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';


// Import needed componenets
import TabIcon from './TabIcon';
import StatView from '../components/Stats'
import Posts from '../components/Posts'


const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user
  }
)


class UserStatView extends Component {
  constructor(props){
    super(props);
    this.state= {
        selectedIndex: 0,
        userInfo: this.props.user,
        loginInfo: this.props.login,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  render(){
    const buttons = [<TabIcon focused={true} name='md-camera'/>, <TabIcon name='md-stats'/>]
    const { selectedIndex } = this.state
    // alert('this.state render' + JSON.stringify(this.state))
    return (
        <ScrollView style={{marginBottom: 40}}>
            <View style={{alignItems: 'center'}}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50, width: '95%'}}
                />
            </View>
            <View style={{width: '100%', alignItems: 'center', alignContent: 'center'}}>
                { selectedIndex ? <StatView />: <Posts />

                }
            </View>
        </ScrollView>


    );
  }
}
export default connect(mapStateToProps)(UserStatView)
