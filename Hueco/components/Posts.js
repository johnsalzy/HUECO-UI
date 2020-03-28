import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';


  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)

class Posts extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: this.props.login.username,
            access_token: this.props.login.access_token,
            userData: this.props.user,
            switch1Value: false,
        }
    }


    render(){

        return (
            <View style={styles.container}>


                <Text>This is posts page</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>


            </View>
        );
  }
}
export default connect(mapStateToProps)(Posts)


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center',
    },
    chart: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff",
    }
});