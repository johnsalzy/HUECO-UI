// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
} from "react-native";
import { Divider } from 'react-native-elements';


//Import Screens/Components/Styles
import { buttons, dividers, avatars, containers, info, text_input} from '../../assets/styles/styles'
import Icon from '../Ionicon'
;
//Redux imports
import {connect} from 'react-redux';
// import { loginUserNormal } from '../redux/actions'


const mapStateToProps = state => (
    {
    login: state.login
    }
)


class TagFriend extends Component {
    constructor(props){
        super(props);
        this.state = {
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            login: this.props.login,
            friend_name: '',
            friendResults: null,
            taggedFriends: [],
            nextData: null,
            prevData: null
        };
    }

    async loadFriendData(apiPath){
        let { login } = this.state
        this.setState({dataFetched: false, prevData: false, nextData: false})
        try {
          //Assign the promise unresolved first then get the data using the json method.
          await fetch(apiPath, {
            headers: {
                'Authorization': 'Bearer ' + login.access_token,
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
              this.setState({friendResults: responseData, prevData: responseData.previous, nextData: responseData.next})
          })
          .done();
        } catch(err) {
            alert("Error with data -----------" + err);
        }
    }


    tagUser = (data, type) => {
        let username = data.username
        let currentlyTagged = this.props.currentlyTagged;
        let currentlyTaggedCount = currentlyTagged.length;
        let user = {id: data.id, name: data.full_name, profile_pic: data.thumbnail}
        let newTagged = currentlyTagged
        if(type == 'add'){
            let { login } = this.state;
            if(username == login.username){
                this.props.showMessage('warning', "You can't tag yourself!")
                return
            } else if(newTagged.some(temp => temp.id == user.id)){
                this.props.showMessage('warning', "User is already tagged!")
                return
            } else {
                if(currentlyTaggedCount >= 10){
                    this.props.showMessage('warning', "You can't tag more than 10 users!")
                    return
                }
                newTagged.push(user)
                this.props.updateTagFriends(newTagged)
                return
            }
        } else {
            for (var i = 0; i < currentlyTaggedCount; i++) {
                if(newTagged[i].id == user.id){
                    newTagged.splice(i,1)
                    this.props.updateTagFriends(newTagged)
                    return
                }
            }
        }
    }

    render() {
        let {friendResults, prevData, nextData, baseAPI, friend_name} = this.state
        let currentlyTagged = this.props.currentlyTagged;
        let currentlyTaggedCount = currentlyTagged.length;
        return (
            <View>
                <Divider style={dividers.standard}/>
                <View style={styles.flexRow}>
                    <View style={{width: '80%'}}>
                        <TextInput style={text_input.search} 
                            placeholder='Search a Name or Username'
                            placeholderTextColor="darkblue"
                            onChangeText = {(friend_name) => this.setState({friend_name})}
                            value = {this.state.friend_name}
                        />
                    </View>
                    <View style={{paddingLeft: 2, width: '20%'}}>
                        <TouchableOpacity onPress={() => this.loadFriendData(baseAPI + 'users/?search=' + friend_name)}>
                            <Text style={buttons.searchText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {/* Show currently tagged users */}
                    {currentlyTaggedCount > 0 &&
                        <View style={{paddingTop:10}}>
                            <Text>Currently Tagged Users Below</Text>
                            <Divider style={dividers.standard}/>
                        </View>
                    }
                    {currentlyTaggedCount > 0 &&
                        currentlyTagged.map((data, index) => (
                            <View key={index} style={containers.small_search_result}>
                                <View style={styles.flexRow}>
                                    <Image style={avatars.small}
                                        source={{uri: data.profile_pic}}
                                    />
                                    <Text style={info.user_search_info}>{data.name}</Text>
                                    <TouchableOpacity style={{marginLeft: 'auto', justifyContent: 'center'}} onPress={() => this.tagUser(data, 'remove')}>
                                        <Icon size={40} color='firebrick' name='remove'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }

                    {/* Show currently search for users */}
                    {/* Show currently tagged users */}
                    {friendResults &&
                        <View style={{paddingTop:10}}>
                            <Text>Users You Can Tag Below</Text>
                            <Divider style={dividers.standard}/>
                        </View>
                    }
                    {friendResults && 
                        friendResults.results.map((data, index) => (
                            <View key={index} style={containers.small_search_result}>
                                <View style={styles.flexRow}>
                                    <Image style={avatars.small}
                                        source={{uri: data.thumbnail}}
                                    />
                                    <Text style={info.user_search_info}>{data.full_name}</Text>
                                    <TouchableOpacity style={{marginLeft: 'auto', justifyContent: 'center'}} onPress={() => this.tagUser(data, 'add')}>
                                        <Icon size={40} color='green' name='add'/>
                                    </TouchableOpacity>
                                    {/* <Text>ID: {data.id}</Text> */}
                                </View>
                            </View>
                        ))
                    }
            
                    {/* Show next/previous page */}
                    {friendResults && 
                        <View>
                            <View style={{flexDirection: 'row', padding: 10}}>
                                {prevData && 
                                    <TouchableOpacity onPress={() => this.loadFriendData(prevData)} style={{alignItems: 'center',}}>
                                        <Icon size={30} name={'keyboard-arrow-left'} color={'cornflowerblue'}/>
                                    </TouchableOpacity> 
                                }
                                {nextData &&
                                    <TouchableOpacity onPress={() => this.loadFriendData(nextData)} style={{alignItems: 'center', marginLeft: 'auto'}}>
                                        <Icon size={30} name={'keyboard-arrow-right'} color={'cornflowerblue'}/>
                                    </TouchableOpacity> 
                                }
                            </View>
                        </View>
                    }



                </View>
                <TouchableOpacity onPress={() => this.props.closeFriends()}>
                    <Text style={buttons.closeText}>Close Friends Tab</Text>
                </TouchableOpacity>
                <Divider style={dividers.standard}/>
            </View>
        );
    }
}
export default connect(mapStateToProps)(TagFriend);


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
    flexRow: {
        flexDirection: 'row',
    },
});