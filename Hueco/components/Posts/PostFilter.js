import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from 'react-native';
import {connect} from 'react-redux';
import { Divider } from 'react-native-elements';

import { fetchGet, fetchPost } from '../../functions/api'
import Icon from '../Ionicon';
import Comment from './Comment';
import MediaPost from './MediaPost';
import { dividers} from '../../assets/styles/styles'  
import ModalView from '../Modals/ModalView'

const mapStateToProps = state => (
  {
    login: state.login,
  }
)
const windowWidth = Dimensions.get('window').width;

class MediaFilter extends PureComponent {
    constructor(props){
        super(props);
        this.state= {
            modalView: false,
            type: 'user',
            login: this.props.login,
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
    commentPost(newComment){
        let data = {...this.state.data}
        data.comment_count = data.comment_count + newComment
        this.setState({data})
    }

    async likePhoto(post_id){
        let apiRoute = 'social/like/';
        let body = {
            post: post_id
        }
        let response = await fetchPost(apiRoute, body) 

        // Flip liked state
        let data = {...this.state.data}
        data.liked = !data.liked
        if(data.liked){
            data.likes = data.likes += 1
        } else {
            data.likes = data.likes -= 1
        }
        this.setState({data})
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
                            borderColor: 'black',
                            padding: 3,
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                onPress={() => this.openDataPage(data.route.id, 'route')}
                            >
                                <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: {width: 0, height: 0},
                                    textShadowRadius: 3}}
                                >
                                    {data.route.name} - {data.route.rating}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {data.media &&
                    <View style={{height: windowWidth, width: windowWidth, borderColor: 'black',}}>
                        <MediaPost type={data.media.media_type} uri={data.media.media_large}/>
                    </View>
                }
                { ( data.user) && 
                <View 
                    style={{
                        backgroundColor: 'white',
                        borderColor: 'black',
                        padding: 3,
                        overflow: "hidden"
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
                                {data.text.length < 60 ?
                                    <Text style={{ fontSize: 18, width: '90%', paddingLeft: 10, alignSelf: 'center', justifyContent: 'center'}}>{data.text}</Text>
                                :
                                    <Text style={{ fontSize: 18, width: '90%', alignSelf: 'center', justifyContent: 'center'}}>{data.text.substring(0, 60)}...</Text>
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
                        <View style={{width: '100%', maxHeight: 260, paddingLeft: 5, paddingRight: 5}}>
                            <View>
                                <Divider style={dividers.standard}/>
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
                            </View>


                            {/* Section to display comments/title */}
                            <ScrollView
                                nestedScrollEnabled={true}
                            >
                                <Text style={styles.postDetails}>Comments</Text>
                                <Comment 
                                    data={{id: data.id, comments: data.comments, text: data.text, 
                                        user: {id: data.user.id, username: data.user.username},
                                        comment_count: data.comment_count,
                                    }}
                                    comment={(count) => this.commentPost(count)}
                                />
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