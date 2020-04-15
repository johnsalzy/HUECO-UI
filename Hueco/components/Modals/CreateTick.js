// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Button,
    TextInput,
    Platform,
    ActivityIndicator
} from "react-native";


//Import Screens/Components/Styles
import Icon from '../Ionicon';
import TagRoute from '../Tags/tagRoute';

//Redux imports
import {connect} from 'react-redux';



const mapStateToProps = state => (
    {
    login: state.login
    }
)

class CreateTick extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            data: this.props.data,
            login: this.props.login,
            taggedRoute: null,
            tagRoute: false,
            caption: null,
            response: null,
        };
    }


    render() {
        let { tagRoute, data, taggedRoute } = this.state;
        return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                >
                    <View style={styles.container}>
                        <ScrollView>
                            <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => this.props.closeModal() }>
                                <Icon size={40} color='firebrick' name='arrow-back'/>
                            </TouchableOpacity>
                            <View style={{alignItems: 'center',}}>
                                {data ?
                                    <Text style={{fontSize: 20}}>{data.name} @ {data.wall}</Text>
                                :
                                    <View>
                                        <Text style={styles.text}>Tag A Route</Text>
                                        <View style={styles.flexRow}>
                                            <TouchableOpacity onPress={() => this.setState({tagRoute: !tagRoute})}>
                                                <Icon size={30} color='dodgerblue' name='map'/>
                                            </TouchableOpacity>
                                        </View>
                                        {tagRoute && 
                                            <TagRoute 
                                                currentlyTagged={taggedRoute}
                                                updateRouteTag={(id) => this.setState({taggedRoute: id})}
                                                closeRoute={() => this.setState({tagRoute: false})}
                                            />
                                        }
                                    </View>
                                }


                                
                                
                                
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
        );
    }
}
export default connect(mapStateToProps)(CreateTick);


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
    text: {
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
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
