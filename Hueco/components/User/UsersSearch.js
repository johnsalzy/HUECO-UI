import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {connect} from 'react-redux';

// Import
import {app_styles} from '../../assets/styles/universal'
import {search_results} from '../../assets/styles/styles'
import ModalView from '../Modals/ModalView';


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            modalVisable: false,
            dataLoaded: null,
            index: null,
        };

    }
    render(){
        let { index, modalVisable, data } = this.state

        return (
              <View style={app_styles.background}>
                  {(data.count > 0) ?
                      data.results.map((data, index) => (
                        <View key={index}>
                          <TouchableOpacity  onPress={() => this.setState({index: index, modalVisable: true })}>
                              <View style={styles.container}>
                                  <View style={search_results.resultContainer}>
                                      <View style={styles.headerContent}>
                                          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <View style={{width: '30%'}}>
                                              <Image style={styles.avatar}
                                                  source={{uri: data.thumbnail}}
                                              />

                                            </View>
                                            <View style={{paddingLeft: 10, width: '70%'}}>
                                              <Text style={styles.name}>{data.full_name}</Text>
                                              <Text style={styles.userInfo}>@{data.username} </Text>
                                              <Text style={styles.userInfo}>Following: {data.following} </Text>
                                              <Text style={styles.userInfo}>Followers: {data.followers} </Text>
                                              <Text style={styles.userInfo}>Sends: {data.sends} </Text>
                                            </View>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                      ))
                  : <Text>No Users Found :(</Text> }
                  {modalVisable && 
                    <ModalView 
                      type={'user'}
                      closeModal={() => this.setState({modalVisable: false})}
                      data={data.results[index]}
                      modalVisable={modalVisable} 
                    />
                  }
              </View>
            
        );
    }
}
export default connect(mapStateToProps)(Users)


const styles = StyleSheet.create({
    //   For Profile 
      container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        padding:5,
        alignItems: 'center',
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "black",
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