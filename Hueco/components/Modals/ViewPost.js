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
                                                    <PostFilter viewPostDetails={true} data={data}/>
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
    }
});