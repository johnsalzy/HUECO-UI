// Import needed Libs
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Text,
    Dimensions,
    ActivityIndicator,
} from "react-native";

import Icon from '../Ionicon';
import RouteList from './RouteList';
import { fetchGet } from '../../functions/api';
import { details } from '../../assets/styles/text';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


class WallModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            route_data: {
                results: [],
                count: 0,
                loading: true,
                next: null,
            },
            
        };
    }


    async loadRouteData(){
        let { data } = this.state;
        let route_data = {}
        route_data.next = null
        route_data.loading = true
        this.setState(route_data)
        route_data.loading = false
        try {
            let response = await fetchGet('routes/?wall=' + data.id)
            route_data.next = response.next;
            route_data.results = response.results;
            route_data.count = response.count;
            this.setState({route_data})
        } catch {
            this.setState({route_data})
        }
    }

    componentDidMount(){
        this.loadRouteData();
    }

    render() {
        let { data, route_data } = this.state
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.modalVisable}
            >   
                <TouchableOpacity style={styles.container} onPress={() => this.props.closeModal()} >
                    <TouchableWithoutFeedback>
                        <View style={styles.containerModal}>
                            <View style={styles.containerModal}>
                                <View>
                                    <View style={{ marginTop: 45}}>
                                        <Text style={styles.name}>{data.name}</Text>
                                        <Text style={styles.userInfo}>@</Text>
                                        <Text style={styles.userInfo}>{data.area.name}</Text>
                                    </View>

                                    <View>
                                        {route_data.count > 0  ?
                                            <View style={{height: '80%', overflow: 'hidden', marginTop: 20}}>
                                                <Text style={details.not_found}>Routes At This Wall</Text>
                                                <RouteList 
                                                    data={route_data} 
                                                    apiRoute={route_data.next}
                                                />

                                            </View>
                                        :
                                            <View style={{alignItems: 'center', marginTop: 20}}>
                                                {route_data.loading ?
                                                    <ActivityIndicator animating size={'large'}/>
                                                :
                                                    <Text style={details.not_found}>No Routes Found At This Wall):</Text>
                                                }
                                                
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity 
                                onPress={() => this.props.closeModal()}
                                style={{marginRight: 'auto', position: 'absolute'}}
                            >
                                <Icon name={'arrow-back'} size={50} color={'firebrick'}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        );
    }
}
export default WallModal;

const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        height: '100%',
        backgroundColor: '#00000080',
    },
    containerModal: {
        position: 'absolute',
        height: '95%',
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        top: windowHeight*.025,
        left: windowWidth*.075,
    },
    name:{
        fontSize:20,
        color:"#000000",
        fontWeight:'600',
        textAlign: 'center'
    },
    userInfo:{
        fontSize:16,
        textAlign: 'center',
        color:"#778899",
        fontWeight:'600',
    },
});