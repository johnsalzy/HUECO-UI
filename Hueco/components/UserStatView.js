import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';


// Import needed componenets
import TabIcon from '../components/TabIcon';



const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user
  }
)

function ImagePage(){
    return (
        <Text>Selected is Image Page</Text>
    );
}

function StatPage(){
    return (
        <Text>Selected is stat Page</Text>
    );
}

class UserStatView extends Component {
  constructor(props){
    super(props);
    this.state= {
        selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  render(){
    const buttons = [<TabIcon focused={true} name='md-camera'/>, <TabIcon name='md-stats'/>]
    const { selectedIndex } = this.state

    return (
        <ScrollView>
            <View style={{alignItems: 'center'}}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50, width: '95%'}}
                />
            </View>
            <View style={{width: '95%', alignItems: 'center', alignContent: 'center'}}>
                { selectedIndex ? <StatPage />: <ImagePage/>

                }
            </View>
        </ScrollView>


    );
  }
}
export default connect(mapStateToProps)(UserStatView)
