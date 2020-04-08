import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Rating } from 'react-native-elements';

// Import
import {app_styles} from '../../assets/styles/universal'
import {search_results} from '../../assets/styles/styles'

export default class RouteView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };

    }

    render(){
        let {data} = this.state
        return (
            <View style={app_styles.background}>
                {data.count > 0 ?
                    data.results.map((data, index) => (
                        <View key={index} style={styles.container}>
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