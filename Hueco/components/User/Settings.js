// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
} from "react-native";
import {connect} from 'react-redux';

import { logoutUser, updateProfile, clearProfile } from '../../redux/actions'
import Icon from '../Ionicon';

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
            data: this.props.data, // Should contain current user data
        };
    }
    logoutUser(){
        this.props.dispatch(logoutUser(this.state.username))
        this.props.dispatch(clearProfile(this.state.username))
        this.setState({profileDataLoaded: false})
    }
    saveUpdates(){
        alert('saving changes')
    }
    render() {
        let { data } = this.state
        return (
            <Modal
                animationType="slide"
                visible={this.props.modalVisable}
            >
                <View style={{width: '100%', height: '100%'}}>
                    <TouchableOpacity style={{padding: 5, marginRight: 'auto'}} onPress={() => this.props.close() }>
                        <Icon size={40} color='firebrick' name='arrow-back'/>
                    </TouchableOpacity>


                    <View style={{padding: 5}}>
                        <Text>Name: {data.first_name}</Text>
                        <Text>Edit profile picture</Text>
                        <Text>Edit Description</Text>
                        <Text>Edit Prized Achievement</Text>
                        <Text>Edit Location</Text>
                        <Text>All your user DATA: {JSON.stringify(data)}</Text>
                        <TouchableOpacity onPress={()=> this.saveUpdates()} style={{paddingTop: 10}}>
                            <Text style={{color: 'green'}}>Save Updates</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.logoutUser()} style={{paddingTop: 20}}>
                            <Text style={{color: 'red'}}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}
export default connect(mapStateToProps)(Settings);


const styles = StyleSheet.create({
    
});