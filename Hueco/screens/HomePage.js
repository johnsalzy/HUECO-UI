import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

//Import files/componenets
import SocialMedia from '../components/SocialMedia';
import Ionicon from '../components/Ionicon';
import AddOptionModal from '../components/Modals/AddOptions';
import AddPostModal from '../components/Modals/CreatePost';
import {app_styles} from '../assets/styles/universal';
import MediaFilter from '../components/Posts/PostFilter';
import PostFilter from '../components/Posts/PostFilter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        modalAddVisable: false,
        modalAddTick: false,
        modalAddPost: false,
        recommended_posts: [90, 89, 88, 85, 86, 87, 91, 92, 93, 94],
        // recommended_posts: [85, 86],
        refreshingPosts: false,

    };
  }
  closeAllModals = () => {
    this.setState({
      modalAddVisable: false, 
      modalAddTick: false,
      modalAddPost: false,});
  }
  createTick = () => {
    alert('creating tick')
    this.setState({
      modalAddVisable: false, 
      modalAddTick: true,
    });
  }
  createPost = () => {
    this.setState({
      modalAddVisable: false, 
      modalAddPost: true,});
  }
  refreshPosts(){
    this.setState({refreshingPosts: true})


    this.setState({recommended_posts: [90, 89, 88, 84, 85, 86, 87], refreshingPosts: false})
  }
  loadMorePosts(){
    // alert('loading more postst')
    let { recommended_posts } = this.state
    // this.setState({recommended_posts: [...recommended_posts, ...[88, 89, 67, 82, 81]] })
  }

  render(){
    let {modalAddVisable, modalAddPost, modalAddTick, recommended_posts, refreshingPosts} = this.state
    return (
        <View style={app_styles.screen}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.textHeader}>New Routes Near You</Text>
                <View style={styles.headerRow} >
                  <Text> Setter   |    Type      |            Name            | Grade </Text>
                  <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                  <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                  <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                  <Text>  Matt  | Top Rope  | Matt's First Route |   5.9</Text>
                </View>
              </View>
              <View style={{alignItems: 'center', height: '100%'}}>
                  <Text style={styles.textHeader}>Recommended Feed</Text>
                  <FlatList 
                    data={recommended_posts}
                    renderItem={({ item }) => 
                      <PostFilter id={item}/>
                    }
                    onEndReached={() => this.loadMorePosts()}
                    onEndReachedThreshold={.2}
                    refreshing={refreshingPosts}
                    onRefresh={() => this.refreshPosts()}
                    keyExtractor={item => item}
                  />
              </View>

              




            {/* <SocialMedia />
            <Text>{"\n"}{"\n"}</Text>Breaks needed so social media does not get covered by nav bar */}

        {/* Create Post Button */}
          <View style={styles.addButton}>
            <TouchableOpacity onPress={() => this.setState({modalAddVisable: true})}>
                <Ionicon color={'cornflowerblue'} name={'add-circle'} size={60}/>
            </TouchableOpacity>
          </View>
          <View>
            <AddOptionModal 
              createPost={() => this.createPost()}
              createTick={() => this.createTick()}
              closeModal={() => this.closeAllModals()} 
              modalVisible={modalAddVisable}
            />
            <AddPostModal 
              modalVisible={modalAddPost}
              closeModal={() => this.closeAllModals()} 
            />
          </View>
        </View>

    );
}
}

const styles = StyleSheet.create({
  textHeader: {
    paddingTop: 20, 
    fontWeight: 'bold', 
    fontSize: 20
  },
  headerRow:{
    borderWidth: 2,
    width: '90%',
    borderColor:'black',
    margin:10,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 20,
  }
});
