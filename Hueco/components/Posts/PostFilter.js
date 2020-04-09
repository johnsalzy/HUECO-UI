import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from 'react-native';
import {connect} from 'react-redux';
import { Divider } from 'react-native-elements';

import { fetchGet } from '../../functions/requests'
import Icon from '../Ionicon';
import TextPost from './TextPost'
import ImagePost from './ImagePost';
import { dividers} from '../../assets/styles/styles'  
import UserView from '../Modals/UserView'

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
            userModal: false,
            login: this.props.login,
            data: this.props.data,
            modalData: {id: '', username: ''},
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            viewPostDetails: false,
            comment_to_add: ''

        }
    }
    openUserPage = (id,username) => {
        let data = {id: id, username: username}
        this.setState({modalData: data, userModal: true })
        
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
        let {comment_to_add, login} = this.state;
        let data = {...this.state.data}
        if(comment_to_add == ""){
            return
        } else {
            data.comment_count += 1
            data.comments.push({username: login.username, comment: comment_to_add})
            alert('Comment photo for: ' + data.id + ' ' + comment_to_add)
            // Call API route to add comments

            this.setState({data: data, comment_to_add: ""})
        }
        
    }

    render(){
        let {data, viewPostDetails, userModal} = this.state
        return (
            <View style={styles.container}>
                {userModal && <UserView data={this.state.modalData} closeModal={() => this.setState({userModal: false})} modalVisable={userModal}/>}
                {( data.media ) &&
                    <View style={{height: windowWidth*.95, width: windowWidth*.94}}>
                        <ImagePost uri={data.media.media_large}/>
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
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', width: windowWidth*.94, height: 80, overflow: 'hidden'}}>
                        {/* Profile picture and name  & post actions*/}
                        <View style={{width: '30%', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.openUserPage(data.user.id, data.user.username)}>
                                        <Image 
                                            source={{'uri': data.user.thumbnail}}  
                                            style={styles.userThumbnail} 
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Post Actions */}
                                <View style={{ justifyContent: 'center'}}>
                                    <View >
                                        <TouchableOpacity onPress={() => this.setState({viewPostDetails: true})} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 5}}>
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
                                <TouchableOpacity onPress={() => this.openUserPage(data.user.id, data.user.username)}>
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
                        <View style={{width: '100%', height: 200, paddingLeft: 5, paddingRight: 5}}>
                            <Divider style={dividers.standard}/>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={styles.flexRow}>
                                    <Text style={styles.postDetails}>Posted: </Text>
                                    <Text>{data.created_at} ago</Text>
                                </View>
                                {data.tagged_users.length > 0 && 
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.postDetails}>Tagged Users</Text>
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            {
                                            data.tagged_users.map((data, index) => (
                                                <TouchableOpacity
                                                    onPress={() => this.openUserPage(data.id, data.username)}
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
                                            onPress={() => alert('Viewing route: ' +data.route.id)}
                                        >
                                            <Text>{data.route.name} - {data.route.rating}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.postDetails}>{data.user.full_name} </Text>
                                    <Text>{data.text}</Text>
                                </View>


                                {/* Section to add a comment */}
                                <View style={{flexDirection: 'row', marginTop: 5, width: '100%', height: 30}}>
                                    <TextInput 
                                        placeholder={'Add your comment'}
                                        style={{padding: 4, borderColor: 'black', borderWidth: 1, borderRadius: 5, width: '65%', paddingRight: 10, height: '100%'}}
                                        onChangeText = {(comment_to_add) => this.setState({comment_to_add})}
                                        value = {this.state.comment_to_add}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            width: '35%', borderColor: 'black', borderWidth: 1, borderRadius: 5, 
                                            backgroundColor: 'cornflowerblue', textAlignVertical: 'center', 
                                            justifyContent: 'center', height: '100%'
                                        }}
                                        onPress={() => this.commentPhoto()}
                                    >

                                        <Text style={{color: 'white', padding: 4, width: '100%', textAlignVertical:'center', textAlign: 'center', justifyContent: 'center'}}>Add Comment</Text>
                                    </TouchableOpacity>
                                </View>


                                {/* Section to display comments */}
                                {data.comment_count > 0 && 
                                    data.comments.map((data, index) => (
                                    <View key={index} style={{marginTop: 5}}>
                                        <Text style={styles.postDetails}>{data.username} </Text>
                                        <Text>{data.comment}</Text>
                                    </View>
                                    ))
                                }
                            </ScrollView>
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
        marginBottom: 25,
        width: windowWidth*.94,
    },
    flexRow: {
        flexDirection: 'row',
        marginTop: 5,
    },
    postDetails: {
        fontWeight: 'bold'
    }
});