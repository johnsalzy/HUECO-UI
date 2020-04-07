import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';


import Icon from '../Ionicon';
  
const mapStateToProps = state => (
  {
    login: state.login,
  }
)

class PostsImage extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: this.props.login.username,
            data: this.props.data,
            baseAPI: "http://3.133.123.120:8000/api/v1/",

        }
    }
    expandPost = (id) => {
        alert('Viewing photo details photo: ' + id)
    }
    likePhoto = (id) => {
        alert('Liking photo for: ' + id)
    }
    commentPhoto = () => {
        alert('Comment photo for: ' + id)
    }
    visitProfile = (id) => {
        alert('Visiting profile for: ' + id)
    }
    render(){
        let { data } = this.state;
        alert('fetchdata' + JSON.stringify(data))
        return (
            <View style={styles.container}>
                <View style={styles.postContainer} >
                    <Image 
                        source={{'uri': data.media.thumbnail}}  
                        style={{
                            alignSelf: 'center',
                            height: 100,
                            width: 100,
                        }} 
                        
                    />

                    {/* <View style={{
                        backgroundColor: '#bfbcb2',
                        padding: 3,
                        }}>
                            <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%'}}>
                                <View style={{justifyContent: 'center', paddingLeft: 5, paddingRight: 5}}>
                                    <TouchableOpacity  onPress={() => this.expandPost(data.id)}>
                                        <Image 
                                            source={{'uri': data.user.thumbnail}}  
                                            style={styles.userThumbnail} 
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style= {{alignItems: 'center', justifyContent: 'center', width: '55%'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center',}}>{data.text}</Text>
                                </View>
                                
                                <View style={{marginLeft: 'auto'}}>
                                    <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                        <Icon color='red' name={'favorite'}/><Text style={{ paddingLeft: 5, color: 'red', fontSize: 15}}>{data.likes}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.commentPhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                        <Icon color='#b863c7' name={'comment'}/><Text style={{paddingLeft: 5, color: '#b863c7', fontSize: 15}}>{data.comment_count}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </View> */}
                </View>
            </View>
        );
  }
}
export default connect(mapStateToProps)(PostsImage)


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    postContainer: {
        borderColor: 'black', borderWidth: 3, 
        marginTop: 10, 
        marginBottom: 10,
        borderRadius: 5,
        width: '100%'
    },
    userThumbnail: {    
        height: 50,
        width: 50,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    }
});