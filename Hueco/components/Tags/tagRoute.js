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
    login: state.login,
    area : state.areas
    }
)


class TagRoute extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            area: this.props.area,
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            route_name: '',
            currentlyTagged: this.props.currentlyTagged,
            routeResults: null,
            taggedRoute: null,
            nextData: null,
            prevData: null
        };
    }

    async loadRouteData(apiPath){
        let { login } = this.state
        this.setState({dataFetched: false, prevData: false, nextData: false})
        try {
          //Assign the promise unresolved first then get the data using the json method.
          await fetch(apiPath, {
            headers: {
                'Authorization': 'Bearer ' + login.access_token,
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
              this.setState({friendResults: responseData, prevData: responseData.previous, nextData: responseData.next})
          })
          .done();
        } catch(err) {
            alert("Error with data -----------" + err);
        }
    }

    render() {
        let {currentlyTagged, baseAPI, route_name, taggedRoute, prevData, nextData, routeResults} = this.state
        return (
            <View>
                <Divider style={dividers.standard}/>
                <Text>Searching In Your Currently Selected Area: {"I am the area name"}</Text>
                <View style={styles.flexRow}>
                    <View style={{width: '80%'}}>
                        <TextInput style={styles.text_input} 
                            placeholder='Search a Route Name'
                            placeholderTextColor="darkblue"
                            onChangeText = {(route_name) => this.setState({route_name})}
                            value = {this.state.route_name}
                        />
                    </View>
                    <View style={{paddingLeft: 2, width: '20%'}}>
                        <TouchableOpacity onPress={() => this.loadRouteData(baseAPI + 'routes/?search=' + route_name)}>
                            <Text style={buttons.searchText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.props.closeRoute()}>
                    <Text style={buttons.closeText}>Close Route Tab</Text>
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