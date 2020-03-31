import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


class UserView extends React.Component {
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
                    ))
                    : <Text>No Users Found :(</Text> }
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
      resultContainer: {
        padding: 7, 
        borderRadius: 8, 
        backgroundColor: "#EBEBEB",
      }
    });