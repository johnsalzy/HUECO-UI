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


import PostFilter from '../Posts/PostFilter';
import Icon from '../Ionicon';
import Activity from '../ActivityIndicator'
import { fetchGet } from '../../functions/requests'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
      api: state.api,
    }
)

class ViewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            // modalVisible = false,
            login: this.props.login,
            baseAPI: this.props.api.baseAPI,
            post_id: this.props.post_id,
            data: null,
            dataFetched: false,
            
        };
    }
    async componentDidMount() {
        // Get data about post using id
        let { post_id, baseAPI, login } = this.state;
        let access_token = login.access_token
        let response = await fetchGet(baseAPI+ 'post/' + post_id + '/', access_token)
        this.setState({data: response, dataFetched: true})
    }
    render() {
        let { data, dataFetched } = this.state
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
                                            <View>
                                                {!dataFetched ? 
                                                    <Activity dataFetched={dataFetched}/>
                                                :
                                                    <PostFilter data={data}/>
                                                }
                                                <TouchableOpacity 
                                                    onPress={() => this.props.closeModal()}
                                                    style={{marginRight: 'auto', position: 'absolute'}}
                                                >
                                                    <Icon name={'arrow-back'} size={50} color={'firebrick'}/>
                                                </TouchableOpacity>
                                            </View>
                                            
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
export default connect(mapStateToProps)(ViewPost);
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