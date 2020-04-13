import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

// Import
import {app_styles} from '../../assets/styles/universal'
import {search_results} from '../../assets/styles/styles';
import ModalView from '../Modals/ModalView';

export default class RouteView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            modalRoute: false,
            route_id: null,
        };

    }

    render(){
        let { data, modalRoute, route_id } = this.state
        return (
            <View style={app_styles.background}>
              {modalRoute && 
                <ModalView 
                  type={'route'} 
                  data={route_id} 
                  closeModal={() => this.setState({modalRoute: false})} 
                  modalVisable={modalRoute}
                />
              }
                {data.count > 0 ?
                    data.results.map((data, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => this.setState({route_id: data.id, modalRoute: true})}
                        >
                          <View style={styles.container}>
                              <View style={search_results.resultContainer}>
                                  <View style={styles.alignInRow}>
                                      <View style={{width: '30%', justifyContent: 'center'}}>
                                        <Image style={styles.avatar}
                                            source={{uri: data.img_url}}
                                        />
                                      </View>
                                      <View style={{paddingLeft: 10, width: '60%', justifyContent: 'center'}}>
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
                    ))
                    : <Text>No Routes Found :(</Text> }
            </View>



    );
    }
}



const styles = StyleSheet.create({

    //   For Profile 
      container: {
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        alignItems: 'center',
      },
      avatar: {
        width: 90,
        height: 90,
        borderRadius: 23,
        borderWidth: 2,
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
      centerVertical: {
        justifyContent: 'center',
      },
      alignInRow: {
        flexDirection: 'row'
      }
    });