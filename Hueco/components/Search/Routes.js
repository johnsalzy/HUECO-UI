import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


class RouteView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };

    }

    render(){
        let {data} = this.state
        return (
            <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                {data.count > 0 ?
                    data.results.map((data, index) => (
                        <View key={index} style={styles.container}>
                            <View style={styles.resultContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.centerVertical, {width: '30%'}}>
                                      <Image style={styles.avatar}
                                          source={{uri: data.img_url}}
                                      />
                                    </View>
                                    <View style={styles.centerVertical, {width: '70%'}}>
                                      <Text style={styles.name}>{data.name}</Text>
                                      <Text style={styles.userInfo}>Grade: {data.rating}</Text>
                                      <Text style={styles.userInfo}>Type: {data.route_type} </Text>
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
export default RouteView



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
        borderRadius: 63,
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
      centerVertical: {
        justifyContent: 'center',
      },
      resultContainer: {
        padding: 7, 
        borderRadius: 8, 
        backgroundColor: "#EBEBEB",
      }
    
    });