// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import { Divider } from 'react-native-elements';

//Import Screens/Components/Styles
import { buttons, dividers, avatars, containers, info, text_input } from '../../assets/styles/styles';
import Icon from '../Ionicon';
import Activity from '../ActivityIndicator';

//Redux imports
import {connect} from 'react-redux';
import { fetchGet } from '../../functions/api'
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
            currentlyTagged: null,
            routeResults: null,
            taggedRoute: null,
            dataFetched: true,
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
        this.setState({dataFetched: false, prevData: false, nextData: false})
        let responseData = await fetchGet(apiPath)
        this.setState({data: responseData, prevData: responseData.previous, nextData: responseData.next, dataFetched: true})
        
    }
    tag = (data, type) => {
        let currentlyTagged  = this.props.currentlyTagged;
        if(type == 'add'){
            if(currentlyTagged != null){
                alert('You cannot tag more than one route')
                return
            } else {
                this.props.updateRouteTag({id: data.id, name: data.name, img_url: data.img_url, wall: data.wall.name, route_type: data.route_type})
            }
        } else {
            this.props.updateRouteTag(null)
        }
    }
    render() {
        let { route_name, prevData, nextData, selected_area, data, dataFetched} = this.state
        let placeholder = ""
        let search_bonus = ""
        if(selected_area != null){
            placeholder = 'Search Routes In ' + selected_area.area.name
            search_bonus = selected_area.area.id
        } else {
            placeholder = 'Search Routes By Name'
        }
        return (
            <View>
                <Divider style={dividers.standard}/>
                {selected_area && 
                    <View style={{paddingBottom: 5}}>
                        <Text>Searching In Your Currently Selected Area: </Text>
                        <TouchableOpacity
                            style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}
                            onPress={() => alert('Changing area')}
                        >
                            <Text>{selected_area.area.name}</Text>
                            <Text style={{paddingLeft: 5, color: 'red'}}>Change Area</Text>
                        </TouchableOpacity>
                    </View>
                }

                {/* Search for route */}
                <View style={styles.flexRow}>
                    <View style={{width: '80%'}}>
                        <TextInput style={text_input.search} 
                            placeholder={placeholder}
                            placeholderTextColor="darkblue"
                            onChangeText = {(route_name) => this.setState({route_name})}
                            value = {this.state.route_name}
                        />
                    </View>
                    <View style={{paddingLeft: 2, width: '20%'}}>
                        <TouchableOpacity 
                            onPress={() => this.loadData('routes/?name=' + route_name + '&area='+ search_bonus)}
                        >
                            <Text style={buttons.searchText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Activity dataFetched={dataFetched}/>
                {/* Show currently tagged route */}
                {this.props.currentlyTagged &&
                    <View style={{paddingTop:10}}>
                        <Text>Currently Tagged Route Below</Text>
                        <Divider style={dividers.standard}/>
                        <View style={containers.small_search_result}>
                            <View style={styles.flexRow}>
                                <Image style={avatars.small}
                                    source={{uri: this.props.currentlyTagged.img_url}}
                                />
                                <Text style={info.user_search_info}>{this.props.currentlyTagged.name}</Text>
                                <TouchableOpacity style={{marginLeft: 'auto', justifyContent: 'center'}} onPress={() => this.tag(null, 'remove')}>
                                    <Icon size={40} color='firebrick' name='remove'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }

                {data &&
                    <View>
                        <View style={{paddingTop:10}}>
                            <Text>Routes You Can Tag Below</Text>
                            <Divider style={dividers.standard}/>
                        </View>
                            {
                            data.results.map((data, index) => (
                                <View key={index} style={containers.small_search_result}>
                                    <View style={styles.flexRow}>
                                        <Image style={avatars.small}
                                            source={{uri: data.img_url}}
                                        />
                                        <Text style={info.user_search_info}>{data.name}</Text>
                                        <TouchableOpacity style={{marginLeft: 'auto', justifyContent: 'center'}} onPress={() => this.tag(data, 'add')}>
                                            <Icon size={40} color='green' name='add'/>
                                        </TouchableOpacity>
                                        {/* <Text>ID: {data.id}</Text> */}
                                    </View>
                                </View>
                            ))
                            }
                    </View>
                }
            
                    {/* Show next/previous page */}
                    {data && 
                        <View>
                            <View style={{flexDirection: 'row', padding: 10}}>
                                {prevData && 
                                    <TouchableOpacity onPress={() => this.loadData(prevData)} style={{alignItems: 'center',}}>
                                        <Icon size={30} name={'keyboard-arrow-left'} color={'cornflowerblue'}/>
                                    </TouchableOpacity> 
                                }
                                {nextData &&
                                    <TouchableOpacity onPress={() => this.loadData(nextData)} style={{alignItems: 'center', marginLeft: 'auto'}}>
                                        <Icon size={30} name={'keyboard-arrow-right'} color={'cornflowerblue'}/>
                                    </TouchableOpacity> 
                                }
                            </View>
                        </View>
                    }
                            
    
                    
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
});