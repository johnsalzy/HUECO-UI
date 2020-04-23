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
import { AirbnbRating  } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import FlashMessage from "react-native-flash-message";

//Import Screens/Components/Styles
import Icon from '../Ionicon';
import TagRoute from '../Tags/tagRoute';
import ImageWithLoader from '../ImageWithLoader';
import { fetchGet, fetchPost } from '../../functions/api'
import { showMessage } from "react-native-flash-message";


const windowWidth = Dimensions.get('window').width;
const send_messages = [
    "Completing a route first try without falling and without prior information. i.e. you haven't watched someone do the boulder problem.",
    "Completing a route first try without falling with some information, such as, rack suggestion or beta.",
    "Completing a route without falls, regardless of the amount you've attempted the route.",
    "Completed a route, however, during completion you fell or were supported by the rope.",
    "Route was attempted, but not completed"
]
const send_values = [1, 2, 3, 4, 5]
const send_types = ['On Sight', 'Flash', 'Send', 'Fell/Hung', 'Attempt' ]


class CreateTick extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            data: this.props.data,
            tagRoute: true,
            date: new Date(Date.now()),
            showDatePicker: false,
            checked: 0,
            rating: 3,
            canSubmit: false,
            taggedRoute: null,
            comment: null,
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
                this.setState({date: currentDate, showDatePicker: false})
            } else {
                this.setState({showDatePicker: false})
            }
        }
      };

    async submitTick(){
        let { data, rating, checked, date, comment } = this.state
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
        let body = {
            route: data.id, stars: rating, date: date, 
            ascent_type: checked+1, comments: comment
        }
        let response = await fetchPost('climbing/tick/', body) // Call api route to submit tick
        if(response.status == 201){
            this.props.closeModal()
            showMessage({
                message: "Tick Added",
                type: "success",
                titleStyle: {fontWeight: 'bold', fontSize: 15},
                floating: true,
                icon: { icon: "success", position: "left" }
            })
        } else {
            this.refs.localFlashMessage.showMessage({
                message: "Failed to Add Tick ):",
                type: "danger",
                titleStyle: {fontWeight: 'bold', fontSize: 15},
                floating: true,
                icon: { icon: "danger", position: "left" }
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
                                            <View>
                                                {
                                                send_values.map((data, index) => (
                                                    <View style={styles.radioButton} key={index}>
                                                        <RadioButton
                                                            value={data-1}
                                                            status={checked === data-1 ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.setState({ checked: data-1}); }}
                                                        />
                                                        <TouchableOpacity 
                                                            onPress={() =>
                                                                this.refs.localFlashMessage.showMessage({
                                                                    message: send_types[data-1],
                                                                    description: send_messages[data-1],
                                                                    type: "info",
                                                                    titleStyle: {fontWeight: 'bold', fontSize: 15},
                                                                    floating: true,
                                                                    icon: { icon: "info", position: "left" }
                                                                })
                                                            }
                                                        >
                                                            <Text>{send_types[data-1]}</Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                ))
                                                }
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

                                        {/* Section to add comment */}
                                        <View>
                                            <Text style={styles.title}>Comment</Text>
                                            <View style={{alignItems: 'flex-start'}}>
                                                <TextInput 
                                                    placeholder={'Crux was sweet.'}
                                                    style={{height: 40, borderColor: 'black', borderWidth: 2, paddingRight: 5, paddingLeft: 5, borderRadius: 5, width: '80%'}}
                                                    onChangeText = {(comment) => this.setState({comment})}
                                                    value = {this.state.comment}
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
                    <FlashMessage ref="localFlashMessage"/>
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
