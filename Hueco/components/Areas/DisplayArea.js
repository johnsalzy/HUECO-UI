import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

// Import
import { buttons } from '../../assets/styles/styles';
import {search_results} from '../../assets/styles/styles'
import Icon from '../Ionicon';


const mapStateToProps = state => (
  {
    login: state.login,
    areas : state.areas,
  }
)

class DisplayArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        subscribed: this.props.subscribed,
        selected: this.props.selected,
        response: null,
        areaModal: false,
    };
  }
  render(){
    let { data, subscribed } = this.state;
    return(
      <View>
          <View style={styles.container}>
              <View style={search_results.resultContainer}>
                  <View style={styles.headerContent}>
                      <View>
                        <View style={{flexDirection: 'row', width: '100%',}}>
                          <Text style={styles.name}>{data.name}</Text>
                          {this.props.selected && 
                            <Tooltip popover={<Text>Pinned As Main Area</Text>}>
                              <Icon name={'place'} size={30} color={'cornflowerblue'}/>
                            </Tooltip>
                          }
                        </View>
                        
                        <View style={{alignItems: 'center', alignSelf: 'center'}}>
                          {subscribed ? 
                            <View>
                              <TouchableOpacity
                                  style={buttons.delete}
                                  onPress={() => this.props.subscribe(data, 'leave')}
                              >
                                <Text style={styles.textButton}>Remove Pin</Text>
                              </TouchableOpacity>
                              {! this.props.selected && 
                                <View style={{paddingTop: 5}}>
                                  <TouchableOpacity
                                    style={buttons.add}
                                    onPress={() => this.props.setMain(data.id)}
                                  >
                                    <Text style={styles.textButton}>Pin as Main Area</Text>
                                  </TouchableOpacity>
                                </View>
                              }
                              
                            </View>
                          :
                              <View>
                                  <TouchableOpacity
                                      style={buttons.add}
                                      onPress={() => this.props.subscribe(data, 'join')}
                                  >
                                    <Text style={styles.textButton}> Pin Area </Text>
                                  </TouchableOpacity>
                              </View>
                          }
                        </View>
                      </View>

                      {data.location ? 
                        <Text style={styles.userInfo}>Location: {data.location} </Text>
                      :
                      <Text style={styles.userInfo}>Location: Unknown</Text>
                      }
                      {data.description && 
                        <Text style={styles.userInfo}>Description: {data.description} </Text>
                      }
                  </View>
              </View>
          </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(DisplayArea)




const styles = StyleSheet.create({

    //   For Profile 
      container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        padding:10,
        alignItems: 'center',
      },
      name:{
        fontSize:20,
        color:"#000000",
        fontWeight:'600',
        textAlign: 'center'
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      dividerInfo: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 5,
        color: 'cornflowerblue',
      },
      textButton: {
        color: 'white', 
        fontWeight: 'bold'
      }
    });