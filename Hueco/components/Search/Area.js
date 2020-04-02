import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

// Import
import {app_styles} from '../../assets/styles/universal'
import {search_results} from '../../assets/styles/styles'

class AreaView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };

    }

    render(){
        let {data} = this.state
        return (
            <View style={app_styles.backgroundColor, {alignItems: 'center'}}>
                {data.count > 0 ?
                    data.results.map((data, index) => (
                        <View key={index} style={styles.container}>
                            <View style={search_results.resultContainer}>
                                <View style={styles.headerContent}>
                                    {/* <Image style={styles.avatar}
                                        source={{uri: data.profile.profile_pic}}
                                    /> */}
                                    <Text style={styles.name}>{data.name}</Text>
                                    <Text style={styles.userInfo}>Location: needed</Text>
                                    <Text style={styles.userInfo}>Description: needed </Text>
                                </View>
                            </View>
                        </View>
                    ))
                    : <Text>No Areas Found :(</Text> }
                {/* <Text>data: {JSON.stringify(data)}</Text> */}
            </View>



    );
    }
}
export default AreaView



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