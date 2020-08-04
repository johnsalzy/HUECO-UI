import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Rating } from 'react-native-elements';


//Import files/componenets
import {search_results} from '../../assets/styles/styles';
import ModalView from '../Modals/ModalView';
import ImageWithLoader from '../ImageWithLoader';

class RouteResult extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        profileModal: false,
        modalData: null,
    };
  }

  render(){
    let { data, profileModal, modalData } = this.state
    return (
        <View>
            {/* Profile/Route Modal */}
            {profileModal && 
                <ModalView 
                    data={modalData} 
                    type={'route'}
                    closeModal={() => this.setState({profileModal: false})} 
                    modalVisable={profileModal}
                />
            }
            <View>
                <TouchableOpacity
                    onPress={() => this.setState({profileModal: true, modalData: {id: data.id}})}
                >
                    <View style={styles.container}>
                        <View style={{
                            borderRadius: 8, 
                            backgroundColor: "white",
                            borderWidth: 2,
                            borderColor: 'black',
                            overflow: 'hidden'
                        }}>
                            <View style={styles.alignInRow}>
                                <View style={{ width: '29%', justifyContent: 'center'}}>
                                  <View style={styles.avatar}>
                                    <ImageWithLoader uri={data.media_large}/>
                                  </View>
                                </View>
                                

                                <View style={{marginLeft: '4%', width: '62%', justifyContent: 'center'}}>
                                    <Text style={styles.name}>{data.name}</Text>
                                    <Text style={styles.userInfo}>Grade: {data.rating}</Text>
                                    <Text style={styles.userInfo}>Type: {data.route_type} </Text>
                                    <View style={styles.alignInRow}>
                                    <Text style={styles.userInfo}>Rating: </Text>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        imageSize={16}
                                        readonly
                                        startingValue={data.stars}
                                        style={{justifyContent: 'center'}}
                                    />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}
export default RouteResult

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    container: {
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        alignItems: 'center',
      },
      avatar: {
        maxWidth: 120,
        maxHeight: 120,
        // borderRadius: 5,
        borderRightWidth: 2,
        borderColor: "black",
        overflow: 'hidden',
        justifyContent: 'center',
        // alignSelf: 'center',
        alignItems: 'center'
      },
      name:{
        fontSize:20,
        color:"#000000",
      },
      userInfo:{
        fontSize:15,
        color:"#778899",
      },
      centerVertical: {
        justifyContent: 'center',
      },
      alignInRow: {
        flexDirection: 'row'
      }
});