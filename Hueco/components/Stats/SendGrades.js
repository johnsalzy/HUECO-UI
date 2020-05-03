import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions } from 'react-native';
import {connect} from 'react-redux';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";
const windowWidth = Dimensions.get('window').width;


// import { logoutUser, updateProfile, clearProfile } from '../redux/actions'
import { fetchGet } from '../../functions/api';

  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)

class SendGrades extends Component {
  constructor(props){
    super(props);
    this.state= {
      userData: this.props.user,
      type: this.props.type,
      id: this.props.id,
      switchValue: false,
      data: null,
      fetch_data: {rope: [], boulder: []}
    }
  }

  async componentDidMount(){
    let { type, id } = this.state;
    if(type == 'user'){
        let response = await fetchGet('users/' + id + "/stats")
        this.setState({fetch_data: response.data, data: {sends: response.data.boulder, type: 'Boulder'}})
    } 

  }
  toggleSwitchAllTime(){
      let { fetch_data, switchValue} = this.state;
      let type = this.state.data.type
      if (type == 'Boulder'){
        this.setState({switchValue: !switchValue, data: {sends: fetch_data.rope, type: 'Top Rope & Lead'}})
      } else {
        this.setState({switchValue: !switchValue, data: {sends: fetch_data.boulder, type: 'Boulder'}})
      }
  }

  render(){
    let {type, data, switchValue} = this.state;
    const chartWidth = windowWidth*.9;
    return (
        <View style={styles.container}>
            {/* For showing all sends */}
            {data &&
              <View style={styles.chart}>
                  <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', paddingRight: 10}}>
                      <Text>Boulder</Text>
                      <Switch onValueChange = {() => this.toggleSwitchAllTime()} value = {switchValue}/>
                      <Text>Top Rope</Text>
                  </View>
                  <VictoryChart domainPadding={15} width={chartWidth}>
                      <VictoryLabel text={"All Time " + data.type + " Sends"} x={chartWidth/2} y={10} textAnchor="middle"/>
                      <VictoryAxis
                          // Needed to have x axis present
                      />
                      <VictoryAxis
                          dependentAxis
                      />
                      <VictoryBar data={data.sends} x="grade" y="count" />
                  </VictoryChart>
              </View>
            }
        </View>
    );
  }
}
export default connect(mapStateToProps)(SendGrades)


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