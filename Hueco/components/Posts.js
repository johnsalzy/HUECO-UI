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
            postData: [],
            loadedPosts: 5
        }
    }
    async componentDidMount(){
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos`)
        const json = await response.json();
        this.setState({ postData: json});
        
    }
    viewPhoto = (id) => {
        alert('Viewing photo details photo: ' + id)
    }
    likePhoto = (id) => {
        alert('Liking photo for: ' + id)
    }
    loadMorePosts = () => {
        let loadedPosts = this.state.loadedPosts
        this.setState({loadedPosts: loadedPosts += 5})
    }
    render(){
        let totalPosts = this.state.postData.length
        let loadedPosts = this.state.loadedPosts
        let postData = this.state.postData.slice(0, loadedPosts)
        return (
            <View style={styles.container}>
                {postData.length == 0 ? <Text>No Posts ):</Text> : 
                    postData.map((data, index) => (
                    <View style={{
                        borderColor: 'black', borderWidth: 3, 
                        marginTop: 10, 
                        marginBottom: 10,
                        borderRadius: 5,
                        width: '95%'
                        }} 
                        key={index}>
                        <Image 
                            source={{'uri': data.url}}  
                            style={{    
                                alignSelf: 'center',
                                height: 400,
                                width: 400,
                        }} 
                        />
                        <View style={{
                            backgroundColor: '#bfbcb2',
                            padding: 5,
                            }}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center',}}>{data.title}</Text>
                                <View style={{flexDirection: 'row', padding: 1, alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.likePhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                        <TabBarIcon color='red' name={'md-heart'}/><Text style={{ paddingLeft: 5, color: 'red', fontSize: 15}}>{data.id}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.viewPhoto(data.id)} style={{flexDirection: 'row', padding: 1, alignItems: 'center', paddingLeft: 10}}>
                                        <TabBarIcon color='#b863c7' name={'ios-text'}/>
                                        <Text style={{paddingLeft: 5, color: '#b863c7', fontSize: 15}}>{data.id-1}</Text>
                                    </TouchableOpacity>
                                </View>
                                
                        </View>
                    </View>
                    ))
                }
                { loadedPosts <= totalPosts ? 
                <TouchableOpacity onPress={() => this.loadMorePosts()} style={{alignItems: 'center',}}>
                    <Text style={{color: '#b863c7', fontWeight: 'bold', fontSize: 20}}>Load more posts</Text>
                </TouchableOpacity> :
                <Text>{"\n"}</Text>
                }
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