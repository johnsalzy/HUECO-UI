import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import {fetchGet } from '../../functions/api';
import ViewPost from '../Modals/ViewPost';
import Icon from '../Ionicon';
import ImageLoader from '../ImageWithLoader';
  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)

class Posts extends Component {
    constructor(props){
        super(props);
        this.state= {
            width: Dimensions.get('window').width,
            username: this.props.login.username,
            access_token: this.props.login.access_token,
            userData: this.props.user,
            id: this.props.id,
            type: this.props.type,
            dataFetched: false,
            fetchData: {count: 0, results: []},
            prevData: false, 
            nextData: false,
            modal_view_post: false,
            post_id: null
        }
    }
    async componentDidMount(){
        let { id, type } = this.state;
        if(type == 'user'){
            let response = await fetchGet('post/media/?user=' + id)
            this.setState({dataFetched: true, fetchData: response, prevData: response.previous, nextData: response.next})
        }
        else{
            let response = await fetchGet('post/media/?route=' + id)
            this.setState({dataFetched: true, fetchData: response, prevData: response.previous, nextData: response.next})
        
        }
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

    viewNextResults = (apiPath) => {
        this.loadPostData(apiPath)
    }
    viewPrevResults = (apiPath) => {
        this.loadPostData(apiPath)
    }
    render(){
        let { fetchData, prevData, nextData, dataFetched, modal_view_post, post_id } = this.state;
        // alert('fetchdata' + JSON.stringify(fetchData))
        return (
            <View style={{width: '100%'}}>
                {modal_view_post && 
                    <ViewPost 
                        modalVisable={modal_view_post} 
                        closeModal={() => this.setState({modal_view_post: false,})}
                        post_id={post_id} 
                    />
                
                }
                <View 
                    onLayout={(event) => this.setState({width: event.nativeEvent.layout.width})}
                    style={styles.container}    
                >
                    {fetchData.count == 0 ? 
                        <View style={{alignContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
                            { dataFetched ?
                                <Text>No Posts :(</Text>
                            :
                                <ActivityIndicator size="large" color="#0000ff"/>
                            }
                            
                        </View>
                    : 
                        fetchData.results.map((data, index) => (
                        <View
                            style={{overflow: 'hidden', width: this.state.width*.33, height: this.state.width*.33, paddingHorizontal: this.state.width*.0066, paddingVertical:this.state.width*.01,}}
                            key={index}
                        >
                            <TouchableOpacity onPress={() => this.setState({post_id: data.id, modal_view_post: true})}>
                                {data.media ? 
                                    <View style={styles.postThumbnail}>
                                        <ImageLoader 
                                            uri={data.media.thumbnail}  
                                        />
                                    </View>
                                : 
                                    <View style={styles.postThumbnail}>
                                        <Text style={{padding: 4, textAlign: 'center', color: 'white', fontWeight: "bold"}}>{data.text}</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        ))
                    }
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 20, padding: 5, width: '100%'}}>
                    {prevData && 
                        <TouchableOpacity 
                            onPress={() => this.viewPrevResults(fetchData.previous)}
                        >
                            <Icon name={'skip-previous'} color={'dodgerblue'} size={30}/>
                        </TouchableOpacity> 
                    }
                    {nextData && 
                        <TouchableOpacity 
                            onPress={() => this.viewNextResults(fetchData.next)} 
                            style={{ marginLeft: 'auto'}}
                        >
                            <Icon name={'skip-next'} color={'dodgerblue'} size={30}/>
                        </TouchableOpacity> 
                    }
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
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingBottom: 10,
        marginBottom: 10,
    },
    loadNextData: {
        color: 'dodgerblue', 
        fontWeight: 'bold', 
        fontSize: 20,
    },
    postThumbnail: {
        height: '100%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 1,
        backgroundColor: 'cornflowerblue',
        justifyContent: 'center',
    }
});