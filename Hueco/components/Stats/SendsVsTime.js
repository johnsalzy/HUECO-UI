import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions } from 'react-native';
import {connect} from 'react-redux';

import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis, VictoryLine } from "victory-native";
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
      data: { //Show bolder by default
        type: 'Boulder',
        sends: this.props.stats.allTime.boulder
      },
    }
  }

    getTickValues(rope, boulder) {
        const dataRopeLast = rope[rope.length]
        const dataBoulderLast = boulder[boulder.length]
        const dataRopeFirst = rope[0]
        const dataBoulderFirst = boulder[0]

        return [
        new Date(1999, 1, 1),
        new Date(2000, 1, 1),
        new Date(2001, 1, 1),
        new Date(2002, 1, 1),
        new Date(2003, 1, 1),
        new Date(2004, 1, 1),
        new Date(2005, 1, 1),
        new Date(2006, 1, 1),
        new Date(2007, 1, 1),
        new Date(2008, 1, 1),
        new Date(2009, 1, 1),
        new Date(2010, 1, 1),
        new Date(2011, 1, 1),
        new Date(2012, 1, 1),
        new Date(2013, 1, 1),
        new Date(2014, 1, 1),
        new Date(2015, 1, 1),
        new Date(2016, 1, 1),
        new Date(2017, 1, 1),
        new Date(2018, 1, 1),
        new Date(2019, 1, 1),
        new Date(2020, 1, 1),
        ];
    }


  render(){
    // alert('this.state render ' + JSON.stringify(this.state.data))
    const chartWidth = windowWidth*.9;
    const ChartStyles = getStyles();
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
    const tickValues = this.getTickValues(data_toprope, data_boulder);

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

                <VictoryLabel style={ChartStyles.title} text={"Sends vs. Time"} x={chartWidth/2} y={30} textAnchor="middle"/>
                <VictoryLabel x={50} y={55} style={ChartStyles.labelOne}
                    text={"Boulder Sends"}
                />
                <VictoryLabel x={350} y={55} style={ChartStyles.labelTwo}
                    text={"Toprope & Lead Sends"}
                />
                
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
                    data={data_toprope}
                    style={ChartStyles.lineOne}
                />
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
                    style={ChartStyles.lineTwo}
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