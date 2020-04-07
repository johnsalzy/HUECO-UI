import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ImagePost from '../Posts/ImagePost';
import Icon from '../Ionicon';
import ImageLoader from '../ImageWithLoader';
  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)
const windowWidth = Dimensions.get('window').width;

class Posts extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: this.props.login.username,
            access_token: this.props.login.access_token,
            userData: this.props.user,
            idUser: this.props.idUser,
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            // For New API call
            dataFetched: false,
            fetchData: {count: 0, results: []},
            prevData: false, 
            nextData: false,
        }
    }
    async componentDidMount(){
        let {baseAPI, idUser} = this.state;
        // alert('id user: ' + idUser.toString(8))
        this.loadPostData(baseAPI + 'post/?user=' + idUser)
    }

    async loadPostData(apiPath){
        let { access_token } = this.state;
        this.setState({dataFetched: false, prevData: false, nextData: false, fetchData: {count: 0, results: []},})
        try {
          await fetch(apiPath, {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
            //   alert('fetch data' + JSON.stringify(responseData))
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
    viewNextResults = (apiPath) => {
        this.loadPostData(apiPath)
    }
    viewPrevResults = (apiPath) => {
        this.loadPostData(apiPath)
    }
    render(){
        let { fetchData, prevData, nextData, dataFetched } = this.state;
        // alert('fetchdata' + JSON.stringify(fetchData))
        return (
            <View>
                <View style={styles.container}>
                    {fetchData.count == 0 ? 
                        <View style={{alignContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
                            { dataFetched ?
                                <Text>User Has No Posts :(</Text>
                            :
                                <ActivityIndicator size="large" color="#0000ff"/>
                            }
                            
                        </View>
                    : 
                        fetchData.results.map((data, index) => (
                        <View
                            style={{overflow: 'hidden'}}
                            key={index}
                        >
                            <TouchableOpacity onPress={() => alert('viewing image/text: ' + data.id)}>
                                {data.media ? 
                                    <View style={styles.postThumbnail}>
                                        <ImageLoader 
                                            data={data}  
                                        />
                                    </View>
                                : 
                                    <View style={styles.postThumbnail}>
                                        <Text>Text: {data.text}</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                            


                            {/* <View
                                style={{
                                borderColor: 'black', borderWidth: 3, 
                                marginTop: 10, 
                                marginBottom: 10,
                                borderRadius: 5,
                                width: '100%'
                            }} 
                            >
                                <Text>Posts page</Text>
                            </View> */}
                            
                            
                            {/* {data.media && 
                                <Image 
                                    source={{'uri': data.media.media}}  
                                    style={{
                                        alignSelf: 'center',
                                        height: 300,
                                        width: '100%',
                                    }} 
                                />
                            } */}
                            {/* <View style={{
                                backgroundColor: '#bfbcb2',
                                padding: 3,
                                }}>
                                    <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%'}}>
                                        <View style={{justifyContent: 'center', paddingLeft: 5, paddingRight: 5}}>
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
                                        
                                        <View style= {{alignItems: 'center', justifyContent: 'center', width: '55%'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center',}}>{data.text}</Text>
                                        </View>

                                        
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
                            </View> */}


                        </View>
                        ))
                    }
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 20, padding: 5, width: '100%'}}>
                    {prevData ? 
                        <TouchableOpacity 
                            onPress={() => this.viewPrevResults(fetchData.previous)}
                        >
                            <Icon name={'skip-previous'} color={'dodgerblue'} size={30}/>
                        </TouchableOpacity> 
                    : null}
                    {nextData ? 
                        <TouchableOpacity 
                            onPress={() => this.viewNextResults(fetchData.next)} 
                            style={{ marginLeft: 'auto'}}
                        >
                            <Icon name={'skip-next'} color={'dodgerblue'} size={30}/>
                        </TouchableOpacity> 
                    : null}
                </View>
            </View>
        );
  }
}
export default connect(mapStateToProps)(Posts)


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    loadNextData: {
        color: 'dodgerblue', 
        fontWeight: 'bold', 
        fontSize: 20,
    },
    postThumbnail: {
        height: windowWidth*.23,
        width: windowWidth*.23,
        borderColor: 'black',
        borderWidth: 1,
        // borderRadius: 4,
        margin: 1,
        backgroundColor: 'linen',
        justifyContent: 'center',
    }
});