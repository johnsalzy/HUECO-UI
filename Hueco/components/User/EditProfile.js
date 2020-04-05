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

import Icon from '../Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            data: this.props.data,
            
        };
    }
    render() {
        let { data, myProfile} = this.state
        return (
            <View>
                <Text>Hello</Text>
            </View>
        );
    }
}
export default connect(mapStateToProps)(EditProfile);


const styles = StyleSheet.create({
    
});