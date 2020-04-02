import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//Import files/componenets
import SocialMedia from '../components/SocialMedia';
import Ionicon from '../components/Ionicon';
import AddOptionModal from '../components/Modals/AddOptions';
import AddPostModal from '../components/Modals/CreatePost';
import {app_styles} from '../assets/styles/universal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        modalAddVisable: false,
        modalAddTick: false,
        modalAddPost: false,
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
  render(){
    let {modalAddVisable, modalAddPost, modalAddTick} = this.state
    return (
        <View style={app_styles.screen}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textHeader}>New Routes Near You</Text>
              <View style={styles.headerRow} >
                <Text> Setter   |    Type      |            Name            | Grade </Text>
                <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
                <Text>  Matt  | Top Rope  | Matt's First Route |   5.9</Text>
              </View>

              <Text style={styles.textHeader}>Your Send Group Updates</Text>
              <View style={styles.headerRow} >
                <Text>John Says: Hello!!</Text>
                <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
                <Text>John Climbed: v10</Text>
                <Text>Matt Climbed: 5.7</Text>
                <Text>John Says: Hello!!</Text>
                <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
                <Text>John Climbed: v10</Text>
                <Text>Matt Climbed: 5.7</Text>
                <Text>John Says: Hello!!</Text>
                <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
                <Text>John Climbed: v10</Text>
                <Text>Matt Climbed: 5.7</Text>
                <Text>John Says: Hello!!</Text>
                <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
                <Text>John Climbed: v10</Text>
                <Text>Matt Climbed: 5.7</Text>
                <Text>John Says: Hello!!</Text>
                <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
                <Text>John Climbed: v10</Text>
                <Text>Matt Climbed: 5.7</Text>
                <Text>John Says: Hello!!</Text>
                <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
                <Text>John Climbed: v10</Text>
                <Text>Matt Climbed: 5.7</Text>
              </View>

              <SocialMedia />
              <Text>{"\n"}{"\n"}</Text>{/* Breaks needed so social media does not get covered by nav bar */}
            </View>
          </ScrollView>
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
