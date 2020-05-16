// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Text,
    Dimensions,
    ActivityIndicator,
} from "react-native";

import ResultFlatList from './ResultFlatList';
import Icon from '../Ionicon';
import RouteList from '../../components/Walls/RouteList';
import { fetchGet } from '../../functions/api';
import { details } from '../../assets/styles/text';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


class AreaView extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            wall_data: {
                results: [],
                count: 0,
                loading: true,
                next: null,
            },
            new_routes: null,
            
        };
    }


    async loadWallData(data){
        let wall_data = {}
        wall_data.next = null
        wall_data.loading = true
        this.setState(wall_data)
        wall_data.loading = false
        try {
            let response = await fetchGet('walls/?area=' + data.area.id)
            wall_data.next = response.next;
            wall_data.results = response.results;
            wall_data.count = response.count;
            this.setState({wall_data})
        } catch {
            this.setState({wall_data})
        }
    }

    async componentDidMount(){
        let { data } = this.state;

        let response = await fetchGet('routes/recent/?area=' + data.area.id)
        this.setState({new_routes: response})
        this.loadWallData(data);
    }

    render() {
        let { data, wall_data, new_routes } = this.state
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.modalVisable}
            >   
                <TouchableOpacity style={styles.container} onPress={() => this.props.closeModal()} >
                    <TouchableWithoutFeedback>
                        <View style={styles.containerModal}>
                            <View style={styles.containerModal2}>
                                <View>
                                    <View style={{ marginVertical: 5, alignItems: 'center'}}>
                                        <Text style={styles.name}>{data.area.name}</Text>
                                    </View>

                                    {new_routes && 
                                        <View>
                                            <Text style={details.not_found}>New Routes In This Area</Text>
                                            <RouteList 
                                                horizontal={true}
                                                data={new_routes} 
                                                apiRoute={new_routes.next}
                                            />
                                        </View>
                                    }




                                    <View>
                                        {wall_data.count > 0  ?
                                            <View style={{maxHeight: '70%', overflow: 'hidden', marginTop: 20}}>
                                                <Text style={details.not_found}>Walls In This Area</Text>
                                                <ResultFlatList 
                                                    data={wall_data} 
                                                    apiRoute={wall_data.next}
                                                />
                                            </View>
                                        :
                                            <View style={{alignItems: 'center', marginTop: 20}}>
                                                {wall_data.loading ?
                                                    <ActivityIndicator animating size={'large'}/>
                                                :
                                                    <Text style={details.not_found}>No Walls Found In This Area ):</Text>
                                                }
                                                
                                            </View>
                                        }
                                    </View>
                                    
                                </View>
                            </View>
                            <TouchableOpacity 
                                onPress={() => this.props.closeModal()}
                                style={{marginRight: 'auto', position: 'absolute', left: 0, top: 0}}
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
export default AreaView;

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
        alignItems: 'center',
        borderRadius: 10,
        top: windowHeight*.025,
        left: windowWidth*.075,
    },
    containerModal2: {
        maxHeight: '93%',
        width: '98%',
        borderRadius: 10,
    },
    name:{
        fontSize:20,
        color:"#000000",
        fontWeight:'bold',
        width: '85%',
        textAlign: 'center',
      },
});