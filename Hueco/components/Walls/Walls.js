import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Import
import {app_styles} from '../../assets/styles/universal';
import {search_results} from '../../assets/styles/styles';
import WallModal from './WallModal';

class WallView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            wallModal: false,
            modalData: null
        };

    }

    render(){
        let { data, wallModal, modalData } = this.state
        return (
            <View style={app_styles.background}>
                {data.results.length > 0 ?
                    data.results.map((data, index) => (
                        <View key={index} style={styles.container}>
                          <TouchableOpacity
                            onPress={() => this.setState({modalData: data, wallModal: true})}
                          >
                              <View style={search_results.resultContainer}>
                                  <View style={styles.headerContent}>
                                      <Text style={styles.name}>{data.name}</Text>
                                      {data.area && <Text style={styles.userInfo}>Location: {data.area.name}</Text>}
                                      {data.area && data.area.description && <Text style={styles.userInfo}>Description: {data.area.description}</Text>}
                                  </View>
                              </View>
                            </TouchableOpacity>
                        </View>
                    ))
                    : <Text>No Walls Found :(</Text> 
                }
                            {/* Wall Modal */}
              {wallModal && 
                  <WallModal 
                      data={modalData} 
                      closeModal={() => this.setState({wallModal: false})} 
                      modalVisable={wallModal}
                  />
              }
            </View>



    );
    }
}
export default WallView



const styles = StyleSheet.create({

    //   For Profile 
      container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        padding:20,
        alignSelf: 'center',
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
        fontWeight:'bold',
        textAlign: 'center',
      },
      userInfo:{
        textAlign: 'center',
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
    });