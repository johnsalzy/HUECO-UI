// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import {connect} from 'react-redux';

import { logoutUser, updateProfile, clearProfile } from '../../redux/actions'
// import Icon from '../Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            data: this.props.data,
            
        };
    }
    logoutUser(){
        this.props.dispatch(logoutUser(this.state.username))
        this.props.dispatch(clearProfile(this.state.username))
        this.setState({profileDataLoaded: false})
      }
    render() {
        let { data, myProfile} = this.state
        return (
            <View>
                <Text>Settings Page</Text>



                <View style={{alignItems: "center", alignContent: "center", paddingBottom: "5%", justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=> this.logoutUser()}>
                    <Text style={{color: 'red'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default connect(mapStateToProps)(Settings);


const styles = StyleSheet.create({
    
});