// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    ActivityIndicator,
    TextInput,
} from "react-native";
import {connect} from 'react-redux';

import { logoutUser, updateProfile, clearProfile } from '../../redux/actions'
import Icon from '../Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            data: this.props.data, // Should contain current user data
            loading: true,
            error: false,
            changes: false,
            first_name: '',
            last_name: '',
            email: '',
            password: null
        };
    }
    logoutUser(){
        this.props.dispatch(logoutUser(this.state.username))
        this.props.dispatch(clearProfile(this.state.username))
        this.setState({profileDataLoaded: false})
    }
    saveUpdates(){
        alert('saving changes')
    }
    render() {
        let { data, loading, error } = this.state
        return (
            <Modal
                animationType="slide"
                visible={this.props.modalVisable}
            >
                <ScrollView style={{width: '100%', height: '100%'}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={{padding: 5, marginRight: 'auto'}} onPress={() => this.props.close() }>
                        <Icon size={40} color='firebrick' name='arrow-back'/>
                    </TouchableOpacity>
                    <View style={{width: '90%'}}>
                        <Text style={styles.headerText}>Edit Account Information</Text>
                        {/* Profile picture */}
                        <View style={styles.flexInRow}>
                            <View
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 1,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    overflow: "hidden"
                                }}
                            >
                                {loading && 
                                    <ActivityIndicator 
                                        style={{width: '100%', height:'100%', justifyContent: "center", alignItems: 'center'}}
                                        size="large" color="#0000ff"
                                    /> 
                                }
                                {error && 
                                    <Text style={{textAlign: 'center'}}>Could Not Load Image.</Text>
                                }
                                <Image 
                                    source={{'uri': data.profile.thumbnail}}
                                    onLoad={() => this.setState({loading: false})}
                                    onError={() => this.setState({loading: false, error: true})}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                />
                            </View>
                            <View style={{height: '100%', alignContent: 'flex-end'}}>
                                <TouchableOpacity 
                                    onPress={() => alert('Upload new photo')}
                                    style={{
                                        position: 'absolute', bottom: 20, left: 10,
                                        backgroundColor: 'dodgerblue', borderRadius: 2, 
                                        justifyContent: 'center', marginLeft: '2%', 
                                        paddingLeft: 10, paddingRight: 10, height: 50
                                    }}
                                >
                                    <Text style={{color: 'white', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold'}}>Change Picture</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Personal Info */}
                        <View style={{padding: 5, width: '100%'}}>
                            <Text style={styles.headerText}>Account Information</Text>

                            <View style={styles.flexInRow}>
                                <Text style={styles.accountInfo}>First Name</Text>
                                <View style={{width: 200}}>
                                    <TextInput 
                                        style={styles.text_input} 
                                        placeholder={data.first_name}
                                        placeholderTextColor="darkblue"
                                        onChangeText = {(first_name) => this.setState({first_name})}
                                        value = {this.state.first_name}
                                    />
                                </View>
                            </View>
                            <View style={styles.flexAndPadding}>
                                <Text style={styles.accountInfo}>Last Name</Text>
                                <View style={{width: 200}}>
                                    <TextInput 
                                        style={styles.text_input} 
                                        placeholder={data.last_name}
                                        placeholderTextColor="darkblue"
                                        onChangeText = {(last_name) => this.setState({last_name})}
                                        value = {this.state.last_name}
                                    />
                                </View>
                            </View>
                            <View style={styles.flexAndPadding}>
                                <Text style={styles.accountInfo}>E-mail</Text>
                                <View style={{width: 200}}>
                                    <TextInput 
                                        style={styles.text_input} 
                                        placeholder={data.email}
                                        placeholderTextColor="darkblue"
                                        onChangeText = {(email) => this.setState({email})}
                                        value = {this.state.email}
                                    />
                                </View>
                            </View>
                            <View style={styles.flexAndPadding}>
                                <Text style={styles.accountInfo}>Location</Text>
                                <View style={{width: 200}}>
                                    <TextInput 
                                        style={styles.text_input} 
                                        placeholder={data.location}
                                        placeholderTextColor="darkblue"
                                        onChangeText = {(location) => this.setState({location})}
                                        value = {this.state.location}
                                    />
                                </View>
                            </View>

                            <Text style={styles.headerText}>Other Information</Text>
                            <Text style={styles.accountInfo}>Edit Prized Achievement</Text>
                            <Text style={styles.accountInfo}>Change Current Area</Text>

                            <TouchableOpacity onPress={()=> this.saveUpdates()} style={{paddingTop: 10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: 'green'}}>Save Changes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> this.logoutUser()} style={{paddingTop: 20}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: 'red'}}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </Modal>
        );
    }
}
export default connect(mapStateToProps)(Settings);


const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold', 
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 5,
        color: 'darkgray'
    },
    text_input: {
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 4,
        width: '100%',
        paddingLeft: 10,
        padding: 2
    },
    accountInfo: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
        width: '40%'
    },
    flexInRow: {
        flexDirection: 'row',
    },
    flexAndPadding: {
        flexDirection: 'row',
        marginTop: 10,
    }
});