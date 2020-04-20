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

import ResultFlatList from '../ResultFlatList';
import Icon from '../Ionicon';
import Walls from '../Search/Walls';
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
                results: null,
                loading: true,
                next: null,
            },
            
        };
    }


    async loadWallData(){
        let { data } = this.state;
        let wall_data = {}
        wall_data.next = null
        wall_data.loading = true
        this.setState(wall_data)
        wall_data.loading = false
        try {
            let response = await fetchGet('walls/?area=' + data.id)
            wall_data.next = response.next
            wall_data.results = response.results
            this.setState({wall_data})
        } catch {
            this.setState({wall_data})
        }
    }

    componentDidMount(){
        this.loadWallData();
    }

    render() {
        let { data, wall_data } = this.state
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
                                    <View style={{height: '40%'}}>
                                        <Text>Area Name {data.name} Pin/sub/unsub</Text>
                                        <Text>Area Description {JSON.stringify(data)}</Text>
                                    </View>
                                    <View>
                                        {wall_data.results ?
                                            <View style={{height: '60%', overflow: 'hidden'}}>
                                                <Text style={details.not_found}>Walls In This Area</Text>
                                                <ResultFlatList 
                                                    data={wall_data} 
                                                    apiRoute={wall_data.next}
                                                />
                                            </View>
                                        :
                                            <View style={{alignItems: 'center'}}>
                                                {wall_data.loading ?
                                                    <ActivityIndicator animating size={'large'}/>
                                                :
                                                    <Text style={details.not_found}>No Walls Found In This Area ):</Text>
                                                }
                                                
                                            </View>
                                        }
                                    </View>

                                    <TouchableOpacity 
                                        onPress={() => this.props.closeModal()}
                                        style={{marginRight: 'auto', position: 'absolute'}}
                                    >
                                        <Icon name={'arrow-back'} size={50} color={'firebrick'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
        borderRadius: 10,
        top: windowHeight*.025,
        left: windowWidth*.075,
    },
});