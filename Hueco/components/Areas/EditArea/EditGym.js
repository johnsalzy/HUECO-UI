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
    Picker,
    Button,
    TextInput,
    Platform,
    ActivityIndicator
} from "react-native";

import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'
//Import Screens/Components/Styles
import Icon from '../../Ionicon';
import { fetchGet, fetchPost } from '../../../functions/api'
import { titles } from '../../../assets/styles/text';
import Routes from '../../Routes/Routes';

const windowWidth = Dimensions.get('window').width;
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
            loading_routes: true,

            // Create a route vars
            sel_grade: 'Boulder',
            route_name: '',
        };
    }
    componentDidMount(){
        let {sel_area} = this.state;
        this.getRoutesInArea(sel_area)
    }

    getRoutesInArea(sel_area){
        let { user } = this.state;
        let apiRoute = 'routes/?setter=' + user.id + '&area=' + sel_area
        this.loadData(apiRoute)
    }

    async loadData(apiRoute){
        this.setState({loading_routes: true})
        let response = await fetchGet(apiRoute)
        this.setState({route_data: response, loading_routes: false})
    }

    render() {
        let { areas, route_data, loading_routes } = this.state;
        return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.props.closeModal()}
                    
                >
                    <ScrollView style={styles.container}>
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.closeModal()}>
                            <Icon size={40} color='firebrick' name='arrow-back'/>
                        </TouchableOpacity>
                        <View>
                            <Text style={titles.regular}>Select Area to Edit</Text>
                            <View style={{ height: 40, borderColor: 'black', borderWidth: 1, justifyContent: 'center' }}>
                                <Picker
                                    selectedValue={this.state.sel_area}
                                    placeholder={'Select An Area...'}
                                    onValueChange={(itemValue) => {
                                                this.setState({ sel_area: itemValue })
                                                this.getRoutesInArea(itemValue)
                                            }
                                        }
                                    >
                                    {areas.status.map((area) => (
                                        <Picker.Item key={area.id} label={area.name} value={area.id}/>
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {/* ------------------- Create a Route Seciton -------------------*/}
                        <View style={{marginTop: 10}}>
                            <Text style={titles.regular}>Create a Route</Text>

                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Name</Text>
                                <View style={{ marginLeft: 10, height: 25, width: 150, borderColor: 'black', borderWidth: 1, justifyContent: 'center' }}>
                                    <TextInput 
                                        style={{paddingLeft: 5}}
                                        onChangeText = {(route_name) => this.setState({route_name})}
                                        value = {this.state.route_name}
                                        placeholder={'Route Name'}
                                    />
                                </View>
                            </View>

                            <View style={styles.flexRow}>
                                <Text style={styles.createTitle}>Type</Text>
                                <View style={{ marginLeft: 10, height: 25, width: 150, borderColor: 'black', borderWidth: 1, justifyContent: 'center' }}>
                                    <Picker
                                        selectedValue={this.state.sel_grade}
                                        placeholder={'Select An Area...'}
                                        onValueChange={(itemValue) => this.setState({ sel_grade: itemValue })}
                                        >
                                        <Picker.Item label={'Boulder'} value={'Boulder'}/>
                                        <Picker.Item label={'Top Rope'} value={'TopRope'}/>
                                        <Picker.Item label={'Lead'} value={'Lead'}/>
                                        <Picker.Item label={'Trad'} value={'Trad'}/>
                                    </Picker>
                                </View>
                            </View>
                            <Text>Grade</Text>
                            <Text>Wall</Text>
                            <Text>Picture(Optional)</Text>
                        </View>


                        <View style={{marginTop: 10}}>
                            <Text style={titles.regular}>Your Routes</Text>
                            <View style={{alignItems: 'center'}}>
                                {loading_routes ?
                                    <ActivityIndicator  animating size="large" />
                                :
                                    <View>
                                        {route_data && 
                                            <View>
                                                <Routes data={route_data}/>
                                                {route_data.next && <TouchableOpacity><Text>Next</Text></TouchableOpacity>}
                                                {route_data.next && <TouchableOpacity><Text>Previous</Text></TouchableOpacity>}
                                            </View>
                                        }
                                    </View>
                                }
                            </View>
                        </View>

                            


                            

                    </ScrollView>
                    <FlashMessage ref="localFlashMessage"/>
                </Modal>
        );
    }
}
export default connect(mapStateToProps)(EditGym);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        ...ifIphoneX({
            paddingTop: 50
        }, {
            paddingTop: 0
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
        marginRight: 'auto'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    createTitle: {
        width: '35%',
        fontSize: 14,
    }

});
