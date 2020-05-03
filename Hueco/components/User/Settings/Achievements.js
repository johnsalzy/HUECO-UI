// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {connect} from 'react-redux';
import FlashMessage from "react-native-flash-message";

// Imports of app libraries
import Icon from '../../Ionicon';
import { fetchGet, fetchPost } from '../../../functions/api'
import { ActivityIndicator } from "react-native-paper";
import { updateUserProfile } from '../../../redux/actions';

const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Achievements extends Component {
    constructor(props){
        super(props);
        this.state = {
            changed: false,
            id: this.props.user_id,
            data: null,
            loading: false,
        };
    }

    async componentDidMount(){
        let { id } = this.state;
        let response = await fetchGet('social/achievement/user/' + id)
        this.setState({data: response})
    }

    async pin_achievement(id){
        let { data } = this.state;
        for(const achievement in data){
            if(data[achievement].achievement.id == id){
                data[achievement].selected = true
            } else {
                data[achievement].selected = false
            }
        }
        let resposne = await fetchPost('social/user-achievement/', {achievement: id})
        if(resposne.status == 200){
            this.props.dispatch(updateUserProfile(true))
            this.setState({data: data})
        } else {
            this.showLocalMessage('Error', 'Could Not Update Achievement', 'danger')
        }
    }

    showLocalMessage(message, description, type){
        this.refs.localFlashMessage.showMessage({
            message: message,
            description: description,
            type: type,
            titleStyle: {fontWeight: 'bold', fontSize: 15},
            floating: true,
            icon: { icon: type, position: "left" }
        })
    }

    render() {
        let {data} = this.state;
        return (
                <ScrollView style={{paddingTop: 5, alignSelf: 'center', width: '80%'}}>
                    <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>Achievements</Text>
                    <View style={{alignSelf: 'center'}}>
                        {data ? 
                            <View style={{paddingTop: 10}}>
                                {data.map((data, index) =>
                                    <View key={index} style={{alignSelf: 'center'}}>
                                        {data.access ?
                                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                                <TouchableOpacity onPress={()=> this.showLocalMessage(data.achievement.name, data.achievement.description, 'info',)}>
                                                    <Text style={styles.has}>{data.achievement.name}</Text>
                                                </TouchableOpacity>
                                                {data.selected ? 
                                                    <Icon name={'place'} size={20} color={'dodgerblue'}/>
                                                :
                                                    <TouchableOpacity
                                                        onPress={() => this.pin_achievement(data.achievement.id)}
                                                    >
                                                        <Icon name={'fiber-pin'} size={20} color={'dodgerblue'}/>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        :
                                            <TouchableOpacity onPress={()=> this.showLocalMessage(data.achievement.name, data.achievement.description, 'info',)}>
                                                <Text style={styles.doesNotHave}>{data.achievement.name}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                
                                )}
                            </View>
                        :
                            <ActivityIndicator animating size={'medium'} />
                        }
                    </View>
                    <FlashMessage ref="localFlashMessage"/>
                </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(Achievements);

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold', 
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 5,
        color: 'darkgray'
    },
    doesNotHave: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
        textAlign: 'center'
    },
    has: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'blue',
        textAlign: 'center'
    },
});