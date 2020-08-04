import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {connect} from 'react-redux';

import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis, VictoryLine } from "victory-native";
import { fetchGet } from '../../functions/api';
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

function getStyles() {
    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";
    return {
      parent: {
        background: "#ccdee8",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        maxWidth: "50%",
        height: "auto"
      },
      title: {
        fill: "#000000",
        fontSize: 18,
        fontWeight: "bold"
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontSize: "14px"
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1},
        ticks: {
          size: ({ tick }) => {
            const tickSize =
              tick.getFullYear() % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontSize: 16
        }
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: ({ tick }) =>
            tick === -10 ? "transparent" : "#ffffff",
          strokeWidth: 2
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontSize: 16
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontSize: 12,
        fontStyle: "italic"
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontWeight: 300,
        fontSize: 21
      },

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontSize: 16
        }
      },
      labelTwo: {
        textAnchor: "end",
        fill: RED_COLOR,
        fontSize: 12,
        fontStyle: "italic"
      },
      lineTwo: {
        data: { stroke: RED_COLOR, strokeWidth: 4.5 }
      },

      // HORIZONTAL LINE
      lineThree: {
        data: { stroke: "#e95f46", strokeWidth: 2 }
      }
    };
}


class Stats extends Component {
  constructor(props){
    super(props);
    this.state= {
      id: this.props.id,
      type: this.props.type,
      switch1Value: false,
      tickValues: [new Date(Date.now())],
      boulder: [],
      rope: []
    }
  }
  async componentDidMount(){
    let {id} = this.state
    let response = await fetchGet('climbing/tick/daily/?user=' + id)
    let rope = []
    let boulder = []
    for(const item in response.rope){
      rope.push({x: new Date(response.rope[item].date), y: response.rope[item].count})
    }
    for(const item in response.boulder){
      boulder.push({x: new Date(response.boulder[item].date), y: response.boulder[item].count})
    }

    this.setState({boulder: boulder, rope: rope})
    this.getTickValues(response)
  }
  getTickValues(data) {
    console.log(data)
      // const dataRopeLast = data.rope[data.rope.length-1].date
      // const dataBoulderLast = data.boulder[data.boulder.length-1].date
      // const dataRopeFirst = data.rope[0].date
      // const dataBoulderFirst = data.boulder[0].date
      // let beginDate = '2025-02-01'
      // console.log('-----------')
      // console.log(dataRopeFirst)
      // console.log(dataBoulderFirst)
      // if(dataRopeFirst < dataBoulderFirst){
      //   beginDate = dataRopeFirst;
      //   console.log('rest1')
      // } else {
      //   beginDate = dataBoulderFirst;
      //   console.log('rest')
      // }
      // console.log(beginDate)
      // let new_tick_vals = [
      //   new Date(beginDate),
      //   new Date(Date.now())
      // ];
      // this.setState({tickValues: new_tick_vals})
  }


  render(){
    const chartWidth = windowWidth*.9;
    const ChartStyles = getStyles();
    let {tickValues, boulder, rope } = this.state;
    return (
        <View style={styles.container}>
            <VictoryChart
                domainPadding={15} width={chartWidth}
            >
                <VictoryAxis
                scale="time"
                standalone={false}
                style={ChartStyles.axisYears}
                tickValues={tickValues}
                tickFormat={
                    (x) => {
                        // if (x.getFullYear() % 10 === 0) {
                        //     return x.getFullYear();
                        // }
                        // if (x.getFullYear() % 5 === 0) {
                        //     return x.getFullYear().toString().slice(2);
                        // }
                        return 'Today';
                    }
                }
                />
                <VictoryAxis dependentAxis
                    offsetX={50}
                    orientation="left"
                    standalone={false}
                    style={ChartStyles.axisOne}
                />
                <VictoryAxis dependentAxis
                  offsetX={50}
                  orientation="right"
                  standalone={false}
                  style={ChartStyles.axisTwo}
                />
                
                <VictoryLabel style={ChartStyles.title} text={"Sends vs. Time"} x={chartWidth/2} y={30} textAnchor="middle"/>
                {boulder.length > 1 && 
                  <VictoryLabel x={50} y={55} style={ChartStyles.labelOne}
                      text={"Boulder"}
                  />
                }
                {rope.length > 1 && 
                  <VictoryLabel x={300} y={55} style={ChartStyles.labelTwo}
                      text={"Rope"}
                  />
                }
                {rope.length > 1 && 
                  <VictoryLine
                      style={{
                          data: { stroke: "#c43a31" },
                          parent: { border: "1px solid #ccc"}
                      }}
                      domain={{
                          // x: [rope[0].x, new Date(Date.now())],
                      }}
                      scale={{x: "time", y: "linear"}}
                      data={rope}
                      style={ChartStyles.lineTwo}
                  />
                }
                {boulder.length > 1 && 
                  <VictoryLine
                      style={{
                          data: { stroke: "#c43a31" },
                          parent: { border: "1px solid #ccc"}
                      }}
                      domain={{
                        // x: [boulder[0].x, new Date(Date.now())],
                      }}
                      scale={{x: "time", y: "linear"}}
                      data={boulder}
                      style={ChartStyles.lineOne}
                  /> 
                } 

            </VictoryChart>
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
    }
});