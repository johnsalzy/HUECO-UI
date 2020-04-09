import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';

class PostsImage extends Component {
    constructor(props){
        super(props);
        this.state= {
            image_uri: this.props.uri,
            loading: true,
            error: false,
        }
    }
    render(){
        let { image_uri, loading, error } = this.state;
        // alert('fetchdata' + JSON.stringify(data))
        return (
            <View style={styles.container}>
                <View style={styles.postContainer} >
                    {loading && 
                        <ActivityIndicator 
                            style={{width: '100%', height:'100%', justifyContent: "center", alignItems: 'center'}}
                            size="large" color="#0000ff"
                        /> 
                    }
                    {error && 
                        <View style={{justifyContent: 'center',height: '100%',backgroundColor: 'cornflowerblue'}}>
                            <Text style={{textAlign: 'center', justifyContent: 'center', fontSize: 20, fontWeight:'bold', color: 'white'}}>Could Not Load Image :(</Text>
                        </View>
                    }
                    <Image 
                        source={{'uri': image_uri}}
                        onLoad={() => this.setState({loading: false})}
                        onError={() => this.setState({loading: false, error: true})}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </View>
            </View>
        );
  }
}
export default PostsImage


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    postContainer: {
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 2,
        width: '100%',
        height: '100%',
    },

});