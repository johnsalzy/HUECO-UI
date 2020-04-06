import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)

function TabBarIcon(props) {
    return (
      <Ionicons
        name={props.name}
        color={props.color}
        size={30}
        style={{ marginBottom: -3 }}
      />
    );
  }

class Posts extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: this.props.login.username,
            access_token: this.props.login.access_token,
            userData: this.props.user,
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            postData: [],
            loadedPosts: 5,

            // For New API call
            dataFetched: false,
            fetchData: {count: 0, results: []},
            prevData: false, 
            nextData: false,
        }
    }
    async componentDidMount(){
        let {baseAPI, access_token} = this.state;
        this.loadPostData(baseAPI + 'post', access_token)
    }

    async loadPostData(apiPath, access_token){
        this.setState({dataFetched: false, prevData: false, nextData: false})
        try {
          await fetch(apiPath, {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
              this.setState({dataFetched: true, fetchData: responseData, prevData: responseData.previous, nextData: responseData.next})
          })
          .done();
        } catch(err) {
            alert("Error with data -----------" + err);
        }
    }
    
    viewPhoto = (id) => {
        alert('Viewing photo details photo: ' + id)
    }
    likePhoto = (id) => {
        alert('Liking photo for: ' + id)
    }
    visitProfile = (id) => {
        alert('Visiting profile for: ' + id)
    }

    render(){
        let { fetchData } = this.state;
        // alert('fetchdata' + JSON.stringify(fetchData))
        return (
            <View style={styles.container}>
                {fetchData.length == 0 ? <Text>No Posts ):</Text> : 
                    fetchData.results.map((data, index) => (
                    <View style={{
                        borderColor: 'black', borderWidth: 3, 
                        marginTop: 10, 
                        marginBottom: 10,
                        borderRadius: 5,
                        width: '95%'
                        }} 
                        key={index}
                    >
                        {data.media && 
                            <Image 
                                source={{'uri': data.media.media}}  
                                style={{    
                                    alignSelf: 'center',
                                    height: 400,
                                    width: 400,
                                }} 
                            />
                        }
                        <View style={{
                            backgroundColor: '#bfbcb2',
                            padding: 3,
                            }}>
                                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                                    {/* This is the thumbnail section */}
                                    <View style={{justifyContent: 'center', paddingRight: 10}}>
                                        <TouchableOpacity  onPress={() => this.visitProfile(data.id)}>
                                            <Image 
                                                source={{'uri': data.user.thumbnail}}  
                                                style={{    
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 50,
                                                    borderColor: 'black',
                                                    borderWidth: 1,
                                                }} 
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {/* This is the Title section */}
                                    <View style= {{alignItems: 'center', justifyContent: 'center', width: '65%'}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center',}}>{data.text}</Text>
                                    </View>

                                    {/* This is likes/comments section */}
                                    <View style={{marginLeft: 'auto'}}>
                                        <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                            <TabBarIcon color='red' name={'md-heart'}/><Text style={{ paddingLeft: 5, color: 'red', fontSize: 15}}>{data.likes}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.viewPhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                            <TabBarIcon color='#b863c7' name={'ios-text'}/>
                                            <Text style={{paddingLeft: 5, color: '#b863c7', fontSize: 15}}>{data.comment_count}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                    </View>
                    ))
                }
                {/* { loadedPosts <= totalPosts ? 
                <TouchableOpacity onPress={() => this.loadMorePosts()} style={{alignItems: 'center',}}>
                    <Text style={{color: '#b863c7', fontWeight: 'bold', fontSize: 20}}>Load more posts</Text>
                </TouchableOpacity> :
                <Text>{"\n"}</Text>
                } */}
            </View>
        );
  }
}
export default connect(mapStateToProps)(Posts)


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignContent: 'center',
    },
});