import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from 'react-native';
import {connect} from 'react-redux';
import { Divider } from 'react-native-elements';

import { fetchGet, fetchPost } from '../../functions/requests'
import Icon from '../Ionicon';
import TextPost from './TextPost';
import MediaPost from './MediaPost';
import { dividers} from '../../assets/styles/styles'  
import ModalView from '../Modals/ModalView'

const mapStateToProps = state => (
  {
    login: state.login,
    api: state.api,
  }
)
const windowWidth = Dimensions.get('window').width;

class MediaFilter extends Component {
    constructor(props){
        super(props);
        this.state= {
            modalView: false,
            type: 'user',
            login: this.props.login,
            baseAPI: this.props.api.baseAPI,
            data: this.props.data,
            modalData: {id: '', username: ''},
            viewPostDetails: this.props.viewPostDetails,
            comment_to_add: ''

        }
    }
    openDataPage = (id, type) => {
        let data = {id: id}
        this.setState({ type: type, modalData: data, modalView: true })
        
    }

    async likePhoto(post_id){
        // Hit API to like photo
        let {login, baseAPI} = this.state;
        let apiRoute = baseAPI + 'social/like/';
        // let access_token = login.access_token;
        // fetchGet(apiRoute, access_token)
        let headers = {
          'Authorization': 'Bearer ' + login.access_token,
          'Content-Type': 'application/json',
        }
        let body = {
            post: post_id
        }
        let response = await fetchPost(apiRoute, headers, body) 

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
    async commentPhoto(post_id){
        let data = {...this.state.data}
        let { baseAPI, comment_to_add, login } = this.state;
        if(comment_to_add == ""){
            return
        } else {
            data.comment_count += 1
            let temp = {text: comment_to_add, user: {username: login.username, id: login.id}}
            data.comments.push(temp)
            // Call API route to add comments
            let apiRoute = baseAPI + 'social/comment/';
            let headers = {
                'Authorization': 'Bearer ' + login.access_token,
                'Content-Type': 'application/json',
            }
            let body = {
                post: post_id,
                text: comment_to_add
            }
            let response = await fetchPost(apiRoute, headers, body)  // Waiting for api to be updated
            this.setState({data: data, comment_to_add: ""}) // Updates/clears state
        }
        
    }

    render(){
        let {data, viewPostDetails, modalView} = this.state
        return (
            <View style={styles.container}>
                {modalView && <ModalView type={this.state.type} data={this.state.modalData} closeModal={() => this.setState({modalView: false})} modalVisable={modalView}/>}
                {data.route && 
                    <View 
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 2,
                            borderWidth: 1,
                            borderColor: 'black',
                            padding: 3,
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                onPress={() => this.openDataPage(data.route.id, 'route')}
                            >
                                <Text style={{fontSize: 15}}>{data.route.name} - {data.route.rating}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {data.media &&
                    <View style={{height: windowWidth*.95, width: '100%'}}>
                        <MediaPost type={data.media.media_type} uri={data.media.media_large}/>
                    </View>
                }
                { ( data.user) && 
                <View 
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: 'black',
                        padding: 3,
                    }}
                >
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%', height: 80, overflow: 'hidden'}}>
                        {/* Profile picture and name  & post actions*/}
                        <View style={{width: '30%', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.openDataPage(data.user.id, 'user')}>
                                        <Image 
                                            source={{'uri': data.user.thumbnail}}  
                                            style={styles.userThumbnail} 
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Post Actions */}
                                <View style={{ justifyContent: 'center'}}>
                                    <View >
                                        <TouchableOpacity onPress={() => this.setState({viewPostDetails: !viewPostDetails})} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 5}}>
                                            <Icon color='cornflowerblue' name={'comment'}/><Text style={{paddingLeft: 5, color: 'cornflowerblue', fontSize: 15}}>{data.comment_count}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View >
                                        {data.liked ?
                                            <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 5}}>
                                                <Icon color='red' name={'favorite'}/><Text style={{ paddingLeft: 5, color: 'red', fontSize: 15}}>{data.likes}</Text>
                                            </TouchableOpacity>
                                        :
                                            <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 5}}>
                                                <Icon color='red' name={'favorite-border'}/><Text style={{ paddingLeft: 5, color: 'red', fontSize: 15}}>{data.likes}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.openDataPage(data.user.id, 'user')}>
                                    <Text style={{fontWeight: 'bold'}}>@{data.user.username}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Post Title */}
                        <TouchableOpacity
                            style={{width: '70%', height: '100%'}}
                            onPress={() => this.setState({viewPostDetails: !viewPostDetails})}
                        >
                            <View style= {{justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden', flexDirection: 'row'}}>
                                {data.text.length < 30 ?
                                    <Text style={{ fontSize: 18, width: '90%', paddingLeft: 10, alignSelf: 'center', justifyContent: 'center'}}>{data.text}</Text>
                                :
                                    <Text style={{ fontSize: 18, width: '90%'}}>{data.text}</Text>
                                }
                                

                                <View style={{width: '10%', justifyContent: 'center'}}>
                                    {viewPostDetails ? 
                                        <Icon name={'unfold-less'} size={20}/>
                                        :
                                        <Icon name={'unfold-more'} size={20}/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {viewPostDetails &&
                        <View style={{width: '100%', height: 260, paddingLeft: 5, paddingRight: 5}}>
                            <Divider style={dividers.standard}/>
                            <ScrollView nestedScrollEnabled={true}>
                                {/* Show when posted */}
                                <View style={styles.flexRow}>
                                    <Text style={styles.postDetails}>Posted: </Text>
                                    <Text>{data.created_at} ago</Text>
                                </View>

                                {/* Show tagged users */}
                                {data.tagged_users.length > 0 && 
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.postDetails}>Tagged Users</Text>
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            {
                                            data.tagged_users.map((data, index) => (
                                                <TouchableOpacity
                                                    onPress={() => this.openDataPage(data.id, 'user')}
                                                    key={index}
                                                >
                                                    <Text>@{data.username} </Text>
                                                </TouchableOpacity>
                                            ))
                                            }
                                        </View>
                                    </View>
                                }
                                {data.route && 
                                    <View>
                                        <Text style={styles.postDetails}>Tagged Route</Text>
                                        <TouchableOpacity
                                            onPress={() => this.openDataPage(data.route.id, 'route')}
                                        >
                                            <Text>{data.route.name} - {data.route.rating}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                {/* Section to display comments/title */}
                                <View style={{marginTop: 5, marginBottom: 30}}>
                                    <Text style={styles.postDetails}>Comments</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity 
                                            onPress={() => this.openDataPage(data.user.id, 'user')}
                                        >
                                            <Text style={styles.postDetails}>@{data.user.username} </Text> 
                                        </TouchableOpacity>
                                        <Text>{data.text}</Text>
                                    </View>
                                    {data.comment_count > 0 && 
                                        data.comments.map((data, index) => (
                                        <View key={index} style={{marginTop: 5, flexDirection:'row'}}>
                                            <TouchableOpacity 
                                                onPress={() => this.openDataPage(data.user.id,'user')}
                                            >
                                                <Text style={styles.postDetails}>@{data.user.username} </Text>
                                            </TouchableOpacity>
                                            <Text>{data.text}</Text>
                                        </View>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                            {/* Section to add a comment */}
                            <View style={{flexDirection: 'row', width: '100%', height: 30, position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
                                    <TextInput 
                                        placeholder={'Add your comment'}
                                        style={{padding: 4, borderColor: 'black', borderWidth: 1, borderRadius: 5, width: '75%', paddingRight: 10, height: '100%'}}
                                        onChangeText = {(comment_to_add) => this.setState({comment_to_add})}
                                        value = {this.state.comment_to_add}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            width: '25%', borderColor: 'black', borderWidth: 1, borderRadius: 5, 
                                            backgroundColor: 'cornflowerblue', textAlignVertical: 'center', 
                                            justifyContent: 'center', height: '100%'
                                        }}
                                        onPress={() => this.commentPhoto(data.id)}
                                    >

                                        <Text style={{color: 'white', padding: 4, width: '100%', textAlignVertical:'center', textAlign: 'center', justifyContent: 'center'}}>Post</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    }
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
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    container: {
        width: '100%',
    },
    flexRow: {
        flexDirection: 'row',
        marginTop: 5,
    },
    postDetails: {
        fontWeight: 'bold'
    }
});