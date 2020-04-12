// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from "react-native";
import {connect} from 'react-redux';


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

                    <Text style={styles.headerText}>Your Achievements</Text>
                    <Text style={styles.accountInfo}>Wears a Beenie</Text>
                    <Text style={styles.accountInfo}>Hold my Beer</Text>

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
    accountInfo: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
        width: '40%'
    },
});