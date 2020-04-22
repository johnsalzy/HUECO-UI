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

//Import Screens/Components/Styles
import Icon from '../Ionicon';
import TagRoute from '../Tags/tagRoute';
import ImageWithLoader from '../ImageWithLoader';
import { fetchGet, fetchPost } from '../../functions/api'
import { showMessage } from "react-native-flash-message";


const windowWidth = Dimensions.get('window').width;


class CreateTick extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            data: this.props.data,
            tagRoute: true,
            date: new Date(Date.now()),
            showDatePicker: false,
            checked: 'onsight',
            rating: 3,
            canSubmit: false,
            taggedRoute: null,
        };
    }

    async chooseRoute(taggedRoute){
        this.setState({data: {
            id: taggedRoute.id, 
            picture: taggedRoute.img_url,
            name: taggedRoute.name,
            wall: taggedRoute.wall
        }})
    }

    onChange = (event, selectedDate) => {
        if(Platform.OS === 'ios'){
            const currentDate = selectedDate || date;
            this.setState({date: currentDate})
        } else {
            if(event.type == 'set'){
                const currentDate = selectedDate || date;
                console.log('currentData' + currentDate, 'event', event)
                this.setState({date: currentDate, showDatePicker: false})
            } else {
                this.setState({showDatePicker: false})
            }
        }
        
        // setShow(Platform.OS === 'ios');
        // setDate(currentDate);
      };

    async submitTick(){
        let { data, rating, checked, date } = this.state
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
        let body = {route: data.id, stars: rating, date: date, send_type: checked, attempts : 1}
        let response = await fetchPost('climbing/tick/', body) // Call api route to submit tick
        this.props.closeModal()
        if(response.status == 201){
            showMessage({
                message: "Tick Added",
                type: "success"
            })
        } else {
            showMessage({
                message: "Failed to Add Tick ):",
                type: "danger"
            })
        }



    }
    render() {
        let { tagRoute, data, showDatePicker, date, checked, rating, canSubmit } = this.state;
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
                                                onPress={() => this.setState({showDatePicker: !showDatePicker})}
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
                                                    onChange={(event, selectedDate) => this.onChange(event, selectedDate)}
                                                    maximumDate={Date.now()}
                                                    onTouchCancel={() => alert('cancel')}
                                                />
                                            }
                                        </View>
                                        
                                        {/* Section to mark ascent type */}
                                        <View>
                                            <Text style={styles.title}>Ascent Type</Text>
                                            <View style={styles.radioButton}>
                                                <RadioButton
                                                    value="onsight"
                                                    status={checked === 'onsight' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ checked: 'onsight', canSubmit: true }); }}
                                                />
                                                <Tooltip popover={<Text>To climb a route clean first time from bottom to top in one continual flow, placing your own equipment or clipping the bolts with no falls and no resting on the rope.</Text>}>
                                                    <Text>On Sight</Text>
                                                </Tooltip>
                                            </View>
                                            <View style={styles.radioButton}>
                                                <RadioButton
                                                    value="flash"
                                                    status={checked === 'flash' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ checked: 'flash', canSubmit: true }); }}
                                                />
                                                <Tooltip popover={<Text>Climbing a route clean with prior knowledge and/or equipment already in place.</Text>}>
                                                    <Text>Flash</Text>
                                                </Tooltip>
                                            </View>
                                            <View style={styles.radioButton}>
                                                <RadioButton
                                                    value="fell_hung"
                                                    status={checked === 'fell_hung' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ checked: 'fell_hung', canSubmit: true }); }}
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
                                                    defaultRating={rating}
                                                    onFinishRating={(rating) => this.setState({rating: rating, canSubmit: true })}
                                                />
                                            </View>
                                        </View>

                                        {/* Section to submit */}
                                        <View style={{alignItems: 'center', marginTop: 15}}>
                                            <TouchableOpacity
                                                style={styles.add}
                                                onPress={() => this.submitTick()}
                                            >
                                                <Text style={{textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>Submit</Text>
                                            </TouchableOpacity>
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
                                
                                    
                                
                            </View>
                            
                        </ScrollView>
                    </View>
                </Modal>
        );
    }
}
export default CreateTick;


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
        alignItems: 'center',
        justifyContent: 'center',
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
