import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {connect} from 'react-redux';

import SendGrades from './SendGrades';
import SendsVsTime from './SendsVsTime';
import RouteComments from './RouteComments';
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
      type: this.props.type,
      id: this.props.id,
    }
  }


  render(){
    let {type, id} = this.state;
    // alert('this.state render ' + JSON.stringify(this.state.data))
    return (
        <View style={styles.container}>
            {type == 'user' && <SendGrades id={id} type={type} />}
            {type == 'user' && <SendsVsTime id={id} type={type}/>}
            {type == 'route' && <RouteComments id={id}/>}



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
});