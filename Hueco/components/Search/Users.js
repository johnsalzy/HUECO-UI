import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// Import
import {app_styles} from '../../assets/styles/universal'
import {search_results} from '../../assets/styles/styles'
import UserModal from '../Modals/UserView';



class UserView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            modalVisable: false
        };

    }

    render(){
        let { data, modalVisable } = this.state
        return (
            
              <View style={app_styles.background}>
                  {data.count > 0 ?
                      data.results.map((data, index) => (
                        <View key={index}>
                          <TouchableOpacity  onPress={() => this.setState({modalVisable: true})}>
                              <View style={styles.container}>
                                  <View style={search_results.resultContainer}>
                                      <View style={styles.headerContent}>
                                          <Image style={styles.avatar}
                                              source={{uri: data.profile.profile_pic}}
                                          />
                                          <Text style={styles.name}>{data.first_name + ' ' + data.last_name}</Text>
                                          <Text style={styles.userInfo}>Achievement: Is a pro</Text>
                                          <Text style={styles.userInfo}>Description: {data.profile.description} </Text>
                                          <Text style={styles.userInfo}>Location: {data.profile.location} </Text>
                                          <Text style={styles.userInfo}>Following: {data.profile.following} </Text>
                                          <Text style={styles.userInfo}>Followers: {data.profile.followers} </Text>
                                          <Text style={styles.userInfo}>Sends: {data.profile.sends} </Text>
                                      </View>
                                  </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                      ))
                      : <Text>No Users Found :(</Text> }
                <UserModal 
                  closeModal={() => this.setState({modalVisable: false})} 
                  modalVisable={modalVisable} 
                  data={data}
                />
              </View>
            
        );
    }
}
export default UserView



const styles = StyleSheet.create({

    //   For Profile 
      container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 90,
        height: 90,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "black",
        marginBottom:10,
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
    });