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
    Button,
    TextInput,
    Platform,
    ActivityIndicator
} from "react-native";
import { RadioButton } from 'react-native-paper';
import { Tooltip, AirbnbRating  } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import {connect} from 'react-redux';

//Import Screens/Components/Styles
import Icon from '../Ionicon';
import TagRoute from '../Tags/tagRoute';
import ImageWithLoader from '../ImageWithLoader';
import { fetchGet, fetchPost } from '../../functions/api'


const windowWidth = Dimensions.get('window').width;
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
            tagRoute: true,
            caption: null,
            response: null,
            date: Date.now(),
            showDatePicker: false,
            checked: 'first',
            rating: 3,
            taggedRoute: null
        };
    }

    async chooseRoute(taggedRoute){
        this.setState({data: {
            id: taggedRoute.id, 
            picture: taggedRoute.img_url,
            name: taggedRoute.name,
            wall: taggedRoute.wall.name
        }})
    }

    updateDate(date){
        console.log('date', date)
        if(date.type == "set"){
            date = date.nativeEvent.timestamp
            this.setState({date: date, showDatePicker: false})
        }
    }
    submitTick(){
        alert('submit tick')
        //close modal
    }
    render() {
        let { tagRoute, data, showDatePicker, date, checked, rating } = this.state;
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
                                    

                                    <View>
                                        {/* Section to show image/title */}
                                        <View style={{flexDirection: 'row'}}>
                                            <View
                                                style={{
                                                    width: windowWidth*.35,
                                                    height: windowWidth*.35,
                                                    borderRadius: 3,
                                                    borderColor: 'black',
                                                    borderWidth: 1,
                                                    overflow: "hidden"
                                                }}
                                            >
                                                <ImageWithLoader uri={data.picture}/>
                                            </View>
                                            <View style={{paddingTop: 10, paddingLeft: 10, paddingRight: 10, width: windowWidth*.6}}>
                                                <Text style={{fontSize: 30}}>{data.name}</Text>
                                                <Text style={{fontSize: 20, color: 'darkgray'}}>{data.wall}</Text>
                                            </View>
                                        </View>

                                        {/* Section to show date picker */}
                                        <View>
                                            <Text style={styles.title}>Date</Text>
                                            <TouchableOpacity
                                                onPress={() => this.setState({showDatePicker: true})}
                                            >
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Icon size={40} color='cornflowerblue' name='today'/>
                                                    <Text style={{fontSize: 20}}>{format(date, 'MM/dd/yyyy')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {showDatePicker && 
                                                <DateTimePicker
                                                    value={date}
                                                    mode={"date"}
                                                    display="default"
                                                    onChange={(date) => this.updateDate(date)}
                                                    maximumDate={Date.now()}
                                                />
                                            }
                                        </View>
                                        
                                        {/* Section to mark ascent type */}
                                        <View>
                                            <Text style={styles.title}>Ascent Type</Text>
                                            <View style={styles.radioButton}>
                                                <RadioButton
                                                    value="first"
                                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ checked: 'first' }); }}
                                                />
                                                <Tooltip popover={<Text>To climb a route clean first time from bottom to top in one continual flow, placing your own equipment or clipping the bolts with no falls and no resting on the rope.</Text>}>
                                                    <Text>On Sight</Text>
                                                </Tooltip>
                                            </View>
                                            <View style={styles.radioButton}>
                                                <RadioButton
                                                    value="second"
                                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ checked: 'second' }); }}
                                                />
                                                <Tooltip popover={<Text>Climbing a route clean with prior knowledge and/or equipment already in place.</Text>}>
                                                    <Text>Flash</Text>
                                                </Tooltip>
                                            </View>
                                            <View style={styles.radioButton}>
                                                <RadioButton
                                                    value="third"
                                                    status={checked === 'third' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ checked: 'third' }); }}
                                                />
                                                <Text>Fell / Hung</Text>
                                            </View>
                                        </View>
                                        {/* Section to make rating */}
                                        <View>
                                            <Text style={styles.title}>Rating</Text>
                                            <View style={{alignItems: 'flex-start'}}>
                                                <AirbnbRating 
                                                    type='star'
                                                    count={5}
                                                    size={25}
                                                    style={{marginTop: '-100%'}}
                                                    defaultRating={rating}
                                                    onFinishRating={(rating) => this.setState({rating: rating})}
                                                />
                                            </View>
                                        </View>
                                    
                                    </View>
                                :
                                    <View style={{alignItems: 'flex-start', marginRight: 'auto'}}>
                                        <Text style={styles.text}>Search A Route</Text>
                                        <TouchableOpacity onPress={() => this.setState({tagRoute: !tagRoute})}>
                                            <Icon size={30} color='dodgerblue' name='map'/>
                                        </TouchableOpacity>

                                        {tagRoute && 
                                            <TagRoute 
                                                updateRouteTag={(data) => this.chooseRoute(data)}
                                                closeRoute={() => this.setState({tagRoute: false})}
                                            />
                                        }
                                    </View>
                                }
                                
                                <TouchableOpacity
                                    style={{marginTop: 15}}
                                    onPress={() => this.submitTick()}
                                >
                                    <Text style={styles.add}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
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
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_input: {
        borderWidth: 2,
        backgroundColor: 'lightskyblue',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 10,
    },
    add: {
        color: 'white',
        padding: 5,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
        height: 50,
        width: 200
    },
    title: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",

    }
});
