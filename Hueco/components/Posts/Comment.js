import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import {connect} from 'react-redux';


import { fetchGet, fetchPost } from '../../functions/api'
import ModalView from '../Modals/ModalView'
import {details} from '../../assets/styles/text';


const mapStateToProps = state => (
  {
    login: state.login,
  }
)


class Comment extends Component {
    constructor(props){
        super(props);
        this.state= {
            comment_to_add: '',
            login: props.login,
            data: props.data,
            comments_loading: false,
            modalData: {id: '', username: ''},
            modalView: false,
            next: null,
            loading: false,
            type: 'user',
        }
    }
    async componentDidMount(){
        let data = {...this.state.data}
        if(data.comment_count > 5){
            this.setState({comments_loading: true})
            let response = await fetchGet('social/comment/?post=' + data.id)
            data.comments = response.results;
            this.setState({data, next: response.next, comments_loading: false})
        }
    }
    openDataPage = (id, type) => {
        let data = {id: id}
        this.setState({ type: type, modalData: data, modalView: true })
    }
    async commentPhoto(post_id){
        let data = {...this.state.data}
        let { comment_to_add, login } = this.state;
        if(comment_to_add == ""){
            return
        } else {
            let temp = {text: comment_to_add, user: {username: login.username, id: login.id}}
            data.comments.push(temp)
            // Call API route to add comments
            let apiRoute = 'social/comment/';
            let body = {
                post: post_id,
                text: comment_to_add
            }
            data.comment_count += 1;
            let response = await fetchPost(apiRoute, body)  // Waiting for api to be updated
            this.setState({data, comment_to_add: ""}) // Updates/clears state
            this.props.comment(1)
        }
    }
    async loadMoreData(){
        let { next } = this.state;
        this.setState({loading: true})
        let data = {...this.state.data}

        let response = await fetchGet(next)
        let temp = response.results
        data.comments = data.comments.concat(temp)
        this.setState({data: data, next: response.next, loading: false})

      }
    

    render(){
        let { data, modalView, comments_loading, next, loading} = this.state
        return (
            <View>
                {modalView && 
                    <ModalView type={this.state.type} 
                        data={this.state.modalData} 
                        closeModal={() => this.setState({modalView: false})} modalVisable={modalView}
                    />
                }
                <View>
                    {/* Show initial comment/title */}
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity 
                            onPress={() => this.openDataPage(data.user.id, 'user')}
                        >
                            <Text style={styles.postDetails}>@{data.user.username} </Text> 
                        </TouchableOpacity>
                        <Text style={{width: '90%'}}>{data.text}</Text>
                    </View>

                    {/* Section to add a comment */}
                    <View style={{paddingTop: 5,}}>
                        <View style={{flexDirection: 'row', width: '100%', height: 30, backgroundColor: 'white'}}>
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


                    {/* Section to View Comments */}
                    {data.comment_count > 0 &&
                        <View>
                            {comments_loading ?
                                <ActivityIndicator animating size='large'/>
                            :
                                <View>
                                    {data.comments.map((item, index) => 
                                        <View style={{marginTop: 5, flexDirection:'row', width: '98%', marginRight: 'auto'}} key={index}>
                                            <TouchableOpacity 
                                                onPress={() => this.props.openPage(item.user.id,'user')}
                                            >
                                                <Text style={styles.postDetails}>@{item.user.username} </Text>
                                            </TouchableOpacity>
                                            <Text style={{width: '90%'}}>{item.text}</Text>
                                        </View>
                                    )}
                                    {next ? 
                                        <View>
                                            {loading ? 
                                                <View style={{paddingBottom: 10}}><ActivityIndicator animating size="large" /></View>
                                            :
                                                <TouchableOpacity
                                                    onPress={ () => this.loadMoreData()}
                                                >
                                                    <Text style={details.not_found}>Load More...</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        :
                                        <View style={{height: '10%', alignItems:'center'}}>
                                            <Text style={details.not_found}>No More Comments ):</Text>
                                        </View>
                                    }
                                </View>

                            }
                        </View>
                    }
                </View>
            </View>
        );
  }
}
export default connect(mapStateToProps)(Comment)


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