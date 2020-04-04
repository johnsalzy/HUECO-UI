// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Divider } from 'react-native-elements';

//Import Screens/Components/Styles
import { buttons, dividers } from '../../assets/styles/styles'

//Redux imports
import {connect} from 'react-redux';
// import { loginUserNormal } from '../redux/actions'


const mapStateToProps = state => (
    {
    login: state.login
    }
)


class TagRoute extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
        };
    }

    render() {
        return (
            <View>
                <Divider style={dividers.standard}/>
                <Text>Tag a Route</Text>
                <TouchableOpacity onPress={() => this.props.closeRoute()}>
                    <Text style={buttons.closeText}>Close</Text>
                </TouchableOpacity>
                <Divider style={dividers.standard}/>
            </View>
        );
    }
}
export default connect(mapStateToProps)(TagRoute);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: '100%', 
        height: '100%', 
        marginTop: 0,
        marginLeft: 0,
        padding: 10,
        borderRadius: 4,
    },
    flexRow: {
        flexDirection: 'row',
    },
    text_input: {
        borderWidth: 2,
        backgroundColor: 'lightskyblue',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 10,
    }
});