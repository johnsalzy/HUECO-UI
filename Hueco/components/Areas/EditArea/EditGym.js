// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    TextInput,
    ActivityIndicator,
    Platform,
} from "react-native";
import Dropdown from '../../DropDown';
import { connect } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'

//Import Screens/Components/Styles
import AttachMedia from '../../Media/AttachMedia';
import ImageWithLoader from '../../ImageWithLoader';
import Icon from '../../Ionicon';
import { fetchGet, fetchPostMedia, fetchDelete } from '../../../functions/api'
import RouteResult from '../../Routes/RouteResult';
import { titles } from '../../../assets/styles/text';
import { boulder_grade, rope_grade } from '../../../assets/languages/ClimbingGrades';

const mapStateToProps = state => (
    {
      areas: state.areas,
      user: state.login,
    }
  );

class EditGym extends Component {
    constructor(props){
        super(props);
        this.state = {
            areas: this.props.areas,
            user: this.props.user,
            sel_area: this.props.areas.status[0].id,
            route_data: null,
            loading_routes: false,
            media: null,
            // Create a route vars
            wall_list: [],
            wallSelectID: null,
            wallSelect: 'Select a Wall',
            gradeSelect: "Select a Grade",
            typeSelect: 'Boulder',
            areaSelect: 'Select An Area',
            route_name: '',
            walls_in_area: [],
            sel_wall_value: null,
            sel_grade_value: '',
            grades: boulder_grade.v_scale,
            attach_media: false,
            creating_route: false,
        };
    }

    getAreaData(sel_area){
        let { user } = this.state;
        let apiRoute = '';
        apiRoute = 'routes/?setter=' + user.id + '&area=' + sel_area.id
        this.loadRouteData(apiRoute)
        // Get the walls in area
        apiRoute = 'walls/?area=' + sel_area.id
        this.loadWallData(apiRoute, [])
    }
    async createRoute(){
        this.setState({creating_route: true})
        var formdata = new FormData();
        // Will create a route when submit button is pressed
        let {wallSelectID, gradeSelect, typeSelect, route_name, media, user} = this.state;
        let message, type = ''
        formdata.append("name", route_name);
        formdata.append("setter", user.id);
        formdata.append("wall", wallSelectID);
        formdata.append("rating", gradeSelect);
        formdata.append("route_type", typeSelect.toLowerCase());
        if(media){
            let uri = Platform.OS === "android" ? media.uri : media.uri.replace("file://", "")
            formdata.append("media.media", {uri:uri, type:'image/jpeg', name:'fetchPostMedia'});
            formdata.append("media.media_type", media.type);
        }
        if(route_name=="" ){
            type = 'info'
            message = "Please Enter A Route Name"
        }
        else if(wallSelectID == null){
            type = 'info'
            message = "Please Select a Wall"
        }
        else if(gradeSelect == "Select a Grade"){
            type = 'info'
            message = "Please Select a Grade"
        } else {
            let response = await fetchPostMedia('routes/', formdata)
            if(response.status == 201){
                this.setState({route_name: "", media: null, gradeSelect: "Select a Grade"})
                type = 'success'
                message = "Route Created"
            } else {
                type = 'danger'
                message = "Could Not Create Route"
            }
        }
        this.setState({creating_route: false})
        this.refs.localFlashMessage.showMessage({
            message: message,
            type: type,
            titleStyle: {fontWeight: 'bold', fontSize: 15},
            floating: true,
            icon: { icon: type, position: "left" }
        })
    }

    async loadWallData(apiRoute, wall_list){
        let response = await fetchGet(apiRoute)
        //Create array of data
        for(const i in response.results){
            wall_list.push({name: response.results[i].name, id: response.results[i].id})
        }
        if(response.next){this.loadWallData(response.next, wall_list)}
        else(this.setState({wall_list: wall_list}))
    }

    async loadRouteData(apiRoute){
        this.setState({loading_routes: true})
        let response = await fetchGet(apiRoute)
        this.setState({route_data: response, loading_routes: false})
    }
    selectGrade(sel_grade){
        let grade = [];
        if(sel_grade.name == "Boulder"){
            grade = boulder_grade.v_scale
        } else {
            grade = rope_grade.yosemite_D_S
        }
        this.setState({ typeSelect: sel_grade.name, grades: grade, gradeSelect: "Select a Grade"})
    }
    async deleteRoute(data){
        let response = await fetchDelete('routes/'+ data.id + '/')
        let message, type = ""
        if(response.status == 200){
            // Remove route from state
            let {route_data} = this.state;
            route_data.count = route_data.count - 1
            for(const route in route_data.results){
                if(route_data.results[route].id == data.id){
                    route_data.results.splice(route, 1)
                    break;
                }
            }
            this.setState({route_data: route_data})
            message = "Route:" + data.name + " Deleted"
            type = 'success'
        } else {
            message = "Could Not Delete " + data.name
            type = 'danger'
        }
        this.refs.localFlashMessage.showMessage({
            message: message,
            type: type,
            titleStyle: {fontWeight: 'bold', fontSize: 15},
            floating: true,
            icon: { icon: type, position: "left" }
        })
    }
    render() {
        let { areas, route_data, loading_routes, grades, wall_list, areaSelect, wallSelect, typeSelect, gradeSelect, attach_media, media, creating_route } = this.state;
        return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.props.closeModal()}
                >
                    <ScrollView style={styles.container}>
                        <View>
                            <Text style={titles.regular}>Select Area to Edit</Text>
                            <View style={{width: '100%'}}>
                                <Dropdown
                                    selected={areaSelect}
                                    setSelected={(item) => {
                                        this.setState({ areaSelect: item.name, wallSelect: 'Select a Wall', wallSelectID: null})
                                        this.getAreaData(item)
                                    }}
                                    data={areas.status}
                                />
                            </View>

                        </View>

                        {/* ------------------- Create a Route Seciton -------------------*/}
                        <View style={{marginTop: 10}}>
                            <Text style={titles.regular}>Create a Route</Text>

                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Name</Text>
                                <View style={{ height: 30, width: 200, borderColor: 'black', borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
                                    <TextInput 
                                        style={{paddingLeft: 5}}
                                        onChangeText = {(route_name) => this.setState({route_name})}
                                        value = {this.state.route_name}
                                        placeholder={'Route Name'}
                                    />
                                </View>
                            </View>
                            {/* Sections to choose wall to add route to */}
                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Wall</Text>
                                <View style={{width: 200}}>
                                    <Dropdown
                                        selected={wallSelect}
                                        setSelected={(item) => this.setState({wallSelect: item.name, wallSelectID: item.id})}
                                        data={wall_list}
                                    />
                                </View>

                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Type</Text>
                                <View style={{width: 200}}>
                                    <Dropdown
                                        selected={typeSelect}
                                        setSelected={(item) => this.selectGrade(item)}
                                        data={[{name: "Boulder"}, {name: "Top Rope"}, {name: "Lead"}, {name: "Trad"}]}
                                    />
                                </View>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Grade</Text>
                                <View style={{width: 200}}>
                                    <Dropdown
                                        selected={gradeSelect}
                                        setSelected={(item) => this.setState({gradeSelect: item.name})}
                                        data={grades}
                                    />
                                </View>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Picture(Optional)</Text>
                                {media ? 
                                    <TouchableOpacity
                                        onPress={() => this.setState({media: null})}
                                    >
                                        <View
                                            style={{width: 200, height: 200}}
                                        >
                                            <ImageWithLoader uri={media.uri}/>
                                        </View>
                                        
                                        <Text style={{color: 'red', textAlign: 'center'}}>Remove Media</Text> 
                                    </TouchableOpacity>
                                : 
                                    
                                    <TouchableOpacity
                                        onPress={() => this.setState({attach_media: true})}
                                    >
                                        <Icon size={20} name={'add-a-photo'}/>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                            
                            <View style={{alignItems: 'center'}}>
                                {creating_route ? 
                                        <ActivityIndicator size={'large'} animating />
                                    :
                                        <TouchableOpacity
                                            onPress={() => this.createRoute()}
                                            style={{width: '50%', alignItems: 'center', backgroundColor: 'cornflowerblue', borderRadius: 5, marginTop: 10}}
                                        >
                                            <Text style={{textAlign: 'center', color: 'white', paddingVertical: 3}}>Create Route</Text>
                                        </TouchableOpacity>
                                }   

                            </View>
                        </View>

                        {/* To show routes that you created */}
                        <View style={{marginTop: 10}}>
                            <Text style={titles.regular}>Your Routes</Text>
                            <View style={{alignItems: 'center'}}>
                                {loading_routes ?
                                    <ActivityIndicator  animating size="large" />
                                :
                                    <View>
                                        {route_data ? 
                                            <View 
                                                style={{...ifIphoneX({
                                                    paddingBottom: 65
                                                }, {
                                                    paddingBottom: 50,
                                                })}}
                                            >
                                                <View>
                                                    {route_data.count > 0 ?
                                                        route_data.results.map((data, index) => (
                                                            <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                <View style={{width: '90%'}}>
                                                                    <RouteResult data={data}/>
                                                                </View>

                                                                <TouchableOpacity
                                                                    style={{alignItems: 'center'}}
                                                                    onPress={() => this.deleteRoute(data)}
                                                                >
                                                                    <Icon name="delete" size={30} color={'red'}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                        ))
                                                    : 
                                                        <Text style={{color: 'cornflowerblue'}}>No Routes Found :(</Text> 
                                                    }
                                                </View>
                                                    
                                                <View style={{flexDirection: 'row', padding: 10}}>
                                                    {route_data.next &&
                                                        <TouchableOpacity onPress={() => this.loadRouteData(route_data.previous)} style={{alignItems: 'center',}}>
                                                            <Text style={styles.loadNextData}>Load Previous</Text>
                                                        </TouchableOpacity> 
                                                    }
                                                    {route_data.prev && 
                                                        <TouchableOpacity onPress={() => this.loadRouteData(route_data.next)} style={{alignItems: 'center', marginLeft: 'auto'}}>
                                                            <Text style={styles.loadNextData}>Load Next</Text>
                                                        </TouchableOpacity> 
                                                    }
                                                </View>
                                            </View>
                                        :
                                            <Text style={{textAlign: 'center', fontSize: 15, color: 'cornflowerblue'}}>Select Area To View Routes</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.props.closeModal()}>
                        <Icon size={40} color='firebrick' name='arrow-back'/>
                    </TouchableOpacity>
                    <FlashMessage ref="localFlashMessage"/>
                    {attach_media && <AttachMedia attachMedia={(given) => this.setState({media: given})} cancelMedia={() => this.setState({attach_media: false})}/>}
                </Modal>
        );
    }
}
export default connect(mapStateToProps)(EditGym);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        ...ifIphoneX({
            paddingTop: 65
        }, {
            paddingTop: 50,
        }),
        marginBottom: getBottomSpace(),
        width: '100%', 
        height: '100%', 
        marginTop: 0,
        marginLeft: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        ...ifIphoneX({
            paddingTop: 30
        }, {
            paddingTop: 15
        }),
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    createTitle: {
        width: '35%',
        fontSize: 14,
    },    
    loadNextData: {
        color: 'dodgerblue', 
        fontWeight: 'bold', 
        fontSize: 20}
    },

);
