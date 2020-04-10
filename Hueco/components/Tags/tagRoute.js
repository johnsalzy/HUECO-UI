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
import { fetchGet } from '../../functions/requests'
// import { loginUserNormal } from '../redux/actions'


const mapStateToProps = state => (
    {
    login: state.login,
    areas : state.areas,
    api: state.api,
    }
)


class TagRoute extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            areas: this.props.areas,
            baseAPI: this.props.api.baseAPI,
            route_name: '',
            currentlyTagged: this.props.currentlyTagged,
            routeResults: null,
            taggedRoute: null,
            data: null,
            nextData: null,
            prevData: null,
            selected_area: null
        };
    }

    componentDidMount(){
        let { areas } = this.state;
        for (const area of areas.area_data){
            if(area.selected){
                this.setState({selected_area: area})
                break
            }
        }
    }

    async loadData(apiPath){
        let { login } = this.state
        this.setState({dataFetched: false, prevData: false, nextData: false})
        let responseData = await fetchGet(apiPath, login.access_token)
        this.setState({data: responseData, prevData: responseData.previous, nextData: responseData.next})
    }

    render() {
        let {currentlyTagged, baseAPI, route_name, taggedRoute, prevData, nextData, routeResults, selected_area, data} = this.state
        alert(JSON.stringify(selected_area))
        return (
            <View>
                <Divider style={dividers.standard}/>
                {selected_area && 
                    <View style={{flexDirection: 'row', paddingBottom: 5}}>
                        <Text>Searching In Your Currently Selected Area: {selected_area.area.name}</Text>
                        <TouchableOpacity
                            onPress={() => alert('Changing area')}
                        >
                            <Text style={{paddingLeft: 5, color: 'red'}}>Change</Text>
                        </TouchableOpacity>
                    </View>
                }
                
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
                        <TouchableOpacity 
                            onPress={() => this.loadData(baseAPI + 'routes/?name=' + route_name + '&areas=selected_area.area.id')}
                        >
                            <Text style={buttons.searchText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {data &&
                            <Text>{JSON.stringify(data)}</Text>
                        }
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