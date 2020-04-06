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
    Dimensions,
} from "react-native";
import {connect} from 'react-redux';


import Profile from '../User/Profile';

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
                                            <Profile data={data}/> 
                                            {/* <Text>{JSON.stringify(data)}</Text> */}
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