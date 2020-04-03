// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Button,
    TextInput,
} from "react-native";

//Import Screens/Components/Styles

// import { text_input } from '../../assets/styles/styles';

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
                <Text>Tag a Friend</Text>
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
    text: {
        paddingTop: 5,
        fontSize: 16,
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