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
import { buttons, dividers} from '../../assets/styles/styles'
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

    searchFriends = () => {
        let { friend_name } = this.state;
        this.loadFriendData(this.state.baseAPI + 'users/?search=' + friend_name)
    }
    tagUser = (id, username) => {
        let { taggedFriends, login } = this.state;
        let newFriends = [id]
        alert('tagging user ' + id + username)
        this.setState({taggedFriends: newFriends})
        this.props.updateTagFriends(newFriends)

    }
    render() {
        let {friendResults} = this.state
        return (
            <View>
                <Divider style={dividers.standard}/>
                <Text>Tag Friends</Text>
                <View style={styles.flexRow}>
                    <View style={{width: '80%'}}>
                        <TextInput style={styles.text_input} 
                            placeholder='Search a name/username'
                            placeholderTextColor="darkblue"
                            onChangeText = {(friend_name) => this.setState({friend_name})}
                            value = {this.state.friend_name}
                        />
                    </View>
                    <View style={{paddingLeft: 2, width: '20%'}}>
                        <TouchableOpacity onPress={() => this.searchFriends()}>
                            <Text style={buttons.searchText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {friendResults && 
                        friendResults.results.map((data, index) => (
                            <View key={index} style={styles.resContainer}>
                                <View style={styles.flexRow}>
                                    <Image style={styles.avatar}
                                        source={{uri: data.profile.profile_pic}}
                                    />
                                    <Text style={styles.userInfo}>{data.first_name + ' ' + data.last_name}</Text>
                                    <TouchableOpacity style={{marginLeft: 'auto', justifyContent: 'center'}} onPress={() => this.tagUser(data.id, data)}>
                                        <Icon size={40} color='firebrick' name='add'/>
                                    </TouchableOpacity>
                                    {/* <Text>ID: {data.id}</Text> */}
                                </View>
                            </View>
                        ))
                    }
                </View>

                <TouchableOpacity onPress={() => this.props.closeFriends()}>
                    <Text style={buttons.closeText}>Close</Text>
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
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center',
    },
    userInfo: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    resContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        marginBottom: 2,
        marginTop: 2,
    },
    text_input: {
        borderWidth: 2,
        backgroundColor: 'lightskyblue',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 10,
    }
});