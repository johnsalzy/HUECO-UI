import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions } from 'react-native';
import {connect} from 'react-redux';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";
import SendsVsTime from './SendsVsTime';
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// import { logoutUser, updateProfile, clearProfile } from '../redux/actions'


  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)

class Stats extends Component {
  constructor(props){
    super(props);
    this.state= {
      username: this.props.login.username,
      access_token: this.props.login.access_token,
      userData: this.props.user,
      type: this.props.type,
      switch1Value: false,
      data: { //Show bolder by default
        type: 'Boulder',
        sends: this.props.stats.allTime.boulder
    },

    }
  }

  toggleSwitchAllTime(){
      let currentVal = this.state.switch1Value
      let type = this.state.data.type
      if (type == 'Boulder'){
        this.setState({switch1Value: !currentVal, data: {sends: this.props.stats.allTime.toprope, type: 'Top Rope & Lead'}})
      } else {
        this.setState({switch1Value: !currentVal, data: {sends: this.props.stats.allTime.boulder, type: 'Boulder'}})
      }
  }

  render(){
    let {type} = this.state;
    // alert('this.state render ' + JSON.stringify(this.state.data))
    const chartWidth = windowWidth*.9;
    return (
        <View style={styles.container}>
            {/* {type == 'route' && 
              // <Text>Route stats</Text>
              
            } */}
            <SendsVsTime type={type}/>


            {/* For showing all sends */}
            {type == 'user' && 
              <View style={styles.chart}>
                  <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', paddingRight: 10}}>
                      <Text>Boulder</Text>
                      <Switch onValueChange = {() => this.toggleSwitchAllTime()} value = {this.state.switch1Value}/>
                      <Text>Top Rope</Text>
                  </View>
                  <VictoryChart domainPadding={15} width={chartWidth}>
                      <VictoryLabel text={"All Time " + this.state.data.type + " Sends"} x={chartWidth/2} y={10} textAnchor="middle"/>
                      <VictoryAxis
                          // Needed to have x axis present
                      />
                      <VictoryAxis
                          dependentAxis
                      />
                      <VictoryBar data={this.state.data.sends} x="Grade" y="Count" />
                  </VictoryChart>
              </View>
            }
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>


        </View>
    );
  }
}
export default connect(mapStateToProps)(Stats)


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center',
        width: '100%'
    },
    chart: {
      width: '90%',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff",
    }
});