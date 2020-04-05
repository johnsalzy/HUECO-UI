// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Image,
    Button,
    Dimensions,
    TextInput,
} from "react-native";
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

import Icon from '../Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class UserViewModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            // modalVisible = false,
            login: this.props.login,
            data: this.props.data,
            myProfile: false,
            
        };
    }
    followUser(id, type){
        if(type){
            alert('following user: ' + id)
        } else {
            alert('unfollowing user: ' + id)
        }
    }
    settings(){
        alert('my settings')
    }
    componentDidMount() {
        let { data, login } = this.state
        // Check if is me
        let my_username = login.username
        if(my_username == data.username){
            this.setState({myProfile: true})
        }   
    }
    render() {
        let { data, myProfile} = this.state
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.modalVisable}
            >   
                <TouchableOpacity onPress={() => this.props.closeModal()} >
                        <View style={styles.container}>
                            <View style={styles.containerModal}>
                                <ScrollView>
                                    <TouchableWithoutFeedback style={styles.containerModal}>
                                        <View>
                                            <View style={{alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: 'black'}}>
                                                <Image 
                                                    style={styles.profile_pic}
                                                    source={{uri: data.profile.profile_pic}}
                                                />
                                            </View>
                                            <View style={{paddingTop: 5, alignItems: 'center',}}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={styles.name}> {data.first_name + ' ' + data.last_name}</Text>
                                                    {myProfile ? 
                                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                                                        <TouchableOpacity onPress={() => this.settings()}>
                                                            <Icon name={'settings'} color={'gray'} size={20}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : 
                                                    // Need to do only one, waiting on data from API
                                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flexDirection: 'row'}}>
                                                        <TouchableOpacity onPress={() => this.followUser(data.id, true)}>
                                                            <Text style={styles.followButton}>Follow</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => this.followUser(data.id, false)}>
                                                            <Text style={styles.unFollowButton}>UnFollow</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    }
                                                </View>
                                                {data.profile.description &&
                                                    <View style={styles.flexInRow}>
                                                        <Icon name='description' /><Text style={styles.userInfo}> {data.profile.description}</Text>
                                                    </View>
                                                }
                                                <View style={styles.flexInRow}>
                                                    <Icon name='stars' /><Text style={styles.userInfo}> {'King Beta Sprayer'} </Text>
                                                </View>
                                                <View style={styles.flexInRow}>
                                                    <Icon name='event' /><Text style={styles.userInfo}> {data.date_joined.split('T')[0]} </Text>
                                                </View>
                                                <View style={styles.flexInRow}>
                                                    <Tooltip popover={<Text>Followers</Text>}>
                                                        <View style={styles.flexInRow}>
                                                            <Icon name='people' /><Text style={styles.userInfo}> {data.profile.followers} </Text>
                                                        </View>
                                                    </Tooltip>
                                                    <Text> </Text>
                                                    <Tooltip popover={<Text>Following</Text>}>
                                                        <View style={styles.flexInRow}>
                                                            <Icon name='search' /><Text style={styles.userInfo}> {data.profile.following} </Text>
                                                        </View>
                                                    </Tooltip>
                                                </View>
                                                <View style={styles.flexInRow}>
                                                    <Icon name='place' /><Text style={styles.userInfo}> {data.profile.location}</Text>
                                                </View>
                                                <Tooltip popover={<Text>Total Sends</Text>}>
                                                    <View style={styles.flexInRow}>
                                                    <Icon name='timeline' /><Text style={styles.userInfo}> {data.profile.sends} </Text>
                                                    </View>
                                                </Tooltip>
                                                
                                            </View>
                                            <TouchableOpacity onPress={() => this.props.closeModal()}>
                                                <Text style={styles.optionDismiss}>Dismiss</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>
                        </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}
export default connect(mapStateToProps)(UserViewModal);
// export default UserViewModal;

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
    modalLeave: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: 'red',
    },
      optionStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'cornflowerblue',
        padding: 2,
      },
      optionDismiss: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'crimson',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }, 
      profile_pic: {
          width: '100%',
          height: windowHeight*.7,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      flexInRow: {
        flexDirection: 'row',
        paddingTop: '1%',
        paddingBottom: '1%',
      },
      unFollowButton: {
        color: 'red',
        padding: 5,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
      },
      followButton: {
        color: 'green',
        padding: 5,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
      }
});