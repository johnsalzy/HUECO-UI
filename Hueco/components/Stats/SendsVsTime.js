import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions } from 'react-native';
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
        fontFamily: "inherit",
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
          fontFamily: "inherit",
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
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 21
      },

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelTwo: {
        textAnchor: "end",
        fill: RED_COLOR,
        fontFamily: "inherit",
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
      userData: this.props.user,
      type: this.props.type,
      switch1Value: false,
      tickValues: [new Date(1999, 1, 1), new Date(Date.now())],
      boulder: [],
      rope: []
    }
  }
  async componentDidMount(){
    let response = await fetchGet('climbing/tick/daily/')
    let rope = []
    for(const item in response.rope){
      console.log('item', item)
      rope.push({x: new Date(response.rope[item].date), y: response.rope[item].count})
    }

    this.setState({boulder: response.boulder, rope: rope})
    this.getTickValues(response)
  }
  getTickValues(data) {
      const dataRopeLast = data.rope[data.rope.length-1].date
      const dataBoulderLast = data.boulder[data.boulder.length-1].date
      const dataRopeFirst = data.rope[0].date
      const dataBoulderFirst = data.boulder[0].date
      let new_tick_vals = [
        new Date(dataRopeFirst),
        new Date(dataBoulderFirst),
        new Date(dataBoulderLast),
        new Date(dataRopeLast),
      ];
      this.setState({tickValues: new_tick_vals})
  }


  render(){
    const chartWidth = windowWidth*.9;
    const ChartStyles = getStyles();
    let {tickValues, boulder, rope } = this.state;
    console.log('SendsVsTime', rope)
    const data_toprope = [
        { x: new Date(1999, 1, 1), y: 2 },
        { x: new Date(2000, 1, 1), y: 3 },
        { x: new Date(2004, 1, 1), y: 5 },
        { x: new Date(2009, 1, 1), y: 20 },
        { x: new Date(2018, 1, 1), y: 7 },
        { x: new Date(2018, 6, 17), y: 7 },
        { x: new Date(2019, 1, 1), y: 7 },
        { x: new Date(2020, 3, 11), y: 7 },
    ]
    const data_boulder = [
        { x: new Date(2004, 5, 1), y: 5 },
        { x: new Date(2009, 3, 1), y: 9 },
        { x: new Date(2018, 7, 1), y: 2 },
        { x: new Date(2018, 6, 17), y: 11 },
        { x: new Date(2019, 4, 1), y: 1 },
        { x: new Date(2020, 3, 11), y: 9 },
    ]
    

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
                        if (x.getFullYear() % 10 === 0) {
                            return x.getFullYear();
                        }
                        if (x.getFullYear() % 5 === 0) {
                            return x.getFullYear().toString().slice(2);
                        }
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
                <VictoryLabel x={50} y={55} style={ChartStyles.labelOne}
                    text={"Boulder Sends"}
                />
                <VictoryLabel x={350} y={55} style={ChartStyles.labelTwo}
                    text={"Toprope & Lead Sends"}
                />
                {rope.length > 1 && 
                  <VictoryLine
                      style={{
                          data: { stroke: "#c43a31" },
                          parent: { border: "1px solid #ccc"}
                      }}
                      domain={{
                          x: [data_toprope[0].x, new Date(Date.now())],
                          y: [0, 30]
                      }}
                      scale={{x: "time", y: "linear"}}
                      data={rope}
                      style={ChartStyles.lineTwo}
                  />
                }
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    domain={{
                        x: [data_boulder[0].x, new Date(Date.now())],
                        y: [0, 30]
                    }}
                    scale={{x: "time", y: "linear"}}
                    data={data_boulder}
                    style={ChartStyles.lineOne}
                />
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