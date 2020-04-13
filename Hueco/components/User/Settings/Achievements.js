// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from "react-native";
import {connect} from 'react-redux';

import Icon from '../../Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Achievements extends Component {
    constructor(props){
        super(props);
        this.state = {
            changed: false,
            loading: false,
        };
    }

    componentDidMount(){
        //Fetch achievements
    }


    render() {

        return (
                <View style={{paddingTop: 5, alignSelf: 'center', width: '80%'}}>
                    <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>Achievements</Text>
                    <View style={{alignSelf: 'center'}}>
                        <View style={{flexDirection: 'row', paddingTop: 20, alignSelf: 'center'}}>
                            <Text style={styles.has}>Wears a Beenie</Text>
                            <Icon name={'place'} size={20} color={'dodgerblue'}/>
                        </View>
                        <Text style={styles.has}>Hold my Beer</Text>
                        <Text style={styles.doesNotHave}>Who Needs a Job? </Text>
                        <Text style={styles.has}>Since the beginning </Text>
                        <Text style={styles.doesNotHave}>Rising Up The Ranks </Text>
                    </View>
                </View>
        );
    }
}
export default connect(mapStateToProps)(Achievements);

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold', 
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 5,
        color: 'darkgray'
    },
    doesNotHave: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
        textAlign: 'center'
    },
    has: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'blue',
        textAlign: 'center'
    },
});