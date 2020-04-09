import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';

import { fetchGet } from '../../functions/requests'
import Icon from '../Ionicon';
import TextPost from './TextPost'
import ImagePost from './ImagePost';
  
const mapStateToProps = state => (
  {
    login: state.login,
  }
)
const windowWidth = Dimensions.get('window').width;

class MediaFilter extends Component {
    constructor(props){
        super(props);
        this.state= {
            login: this.props.login,
            id: this.props.id,
            data: null,
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            dataLoaded: false

        }
    }
    componentDidMount(){
        this.fetchPostData()
    }
    async fetchPostData(){
        let {id, login, baseAPI} = this.state;
        let apiRoute = baseAPI + 'post/' + id + '/';
        let access_token = login.access_token;
        let response = await fetchGet(apiRoute, access_token)
        this.setState({data: response, dataLoaded: true})
    }
    likePhoto = () => {
        // Hit API to like photo
        // let {id, login, baseAPI} = this.state;
        // let apiRoute = baseAPI + 'post/' + id + '/';
        // let access_token = login.access_token;
        // fetchGet(apiRoute, access_token)

        // Flip state
        let data = {...this.state.data}
        data.liked = !data.liked
        if(data.liked){
            data.likes = data.likes += 1
        } else {
            data.likes = data.likes -= 1
        }
        
        this.setState({data})
    }
    commentPhoto = () => {
        alert('Comment photo for: ' + id)
    }
    seeUser = (id) => {
        alert('see user: ' + id)
    }

    render(){
        let {id, data, dataLoaded} = this.state
        return (
            <View style={styles.container}>
                {(dataLoaded && data.media ) &&
                    <View style={{height: windowWidth*.95, width: windowWidth*.95}}>
                        <ImagePost uri={data.media.media_large}/>
                        <Text style={{color: 'red'}}>This is test</Text>
                    </View>
                }
                { (dataLoaded && data.user) && 
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: 'black',
                    padding: 3,
                    }}
                >
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%'}}>
                        {/* Profile picture and name */}
                        <View style={{justifyContent: 'center', width: '30%',}}>
                            <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={() => this.seeUser(data.id)}>
                                <Image 
                                    source={{'uri': data.user.thumbnail}}  
                                    style={styles.userThumbnail} 
                                />
                                <View style={{paddingLeft: 4}}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{data.user.full_name.split(' ')[0]}</Text>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{data.user.full_name.split(' ')[1]}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Post Title */}
                        <View style= {{alignItems: 'center', justifyContent: 'center', width: '50%'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center',}}>{data.text}</Text>
                        </View>
                        
                        {/* Post Actions */}
                        <View style={{marginLeft: 'auto', width: '20%', justifyContent: 'center'}}>
                            <View style={{marginLeft: 'auto'}}>
                                <TouchableOpacity onPress={() => this.commentPhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                    <Text style={{paddingRight: 5, color: 'cornflowerblue', fontSize: 15}}>{data.comment_count}</Text><Icon color='cornflowerblue' name={'comment'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginLeft: 'auto'}}>
                                {data.liked ?
                                    <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                        <Text style={{ paddingRight: 5, color: 'red', fontSize: 15}}>{data.likes}</Text><Icon color='red' name={'favorite'}/>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                        <Text style={{ paddingRight: 5, color: 'red', fontSize: 15}}>{data.likes}</Text><Icon color='red' name={'favorite-border'}/>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </View>
                }
            </View>
        );
  }
}
export default connect(mapStateToProps)(MediaFilter)


const styles = StyleSheet.create({
    userThumbnail: {    
        height: 50,
        width: 50,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
    container: {
        marginBottom: 25,
        width: windowWidth*.95,
    }
});