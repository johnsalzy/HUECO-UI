import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { FAB, Portal, Provider } from 'react-native-paper';

//Import files/componenets
import AddPostModal from '../components/Modals/CreatePost';
import AddTickModal from '../components/Modals/CreateTick';
import {app_styles} from '../assets/styles/universal';
import PostFilter from '../components/Posts/PostFilter';
import { fetchGet } from '../functions/requests'
import { updateAreaData } from '../redux/actions'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mapStateToProps = state => (
  {
    login: state.login,
    api: state.api,
  }
);

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        login: this.props.login,
        modalAddTick: false,
        modalAddPost: false,
        data: null,
        nextData: null,
        dataLoaded: false,
        refreshingPosts: false,
        loading: false,
        userModal: false,
        initialLoad: true,
        baseAPI: this.props.api.baseAPI,
        open: false,

    };
  }

  refreshPosts(){
    this.setState({refreshingPosts: true})
    this.fetchPostData()
  }
  async loadMorePosts(){
    this.setState({loading: true})
    let {login, nextData} = this.state;
    let data = {...this.state.data}
    if(nextData && data){
      let apiRoute = nextData;
      let access_token = login.access_token;
      let response = await fetchGet(apiRoute, access_token)
      let temp = data.results
      let temp2 = response.results
      data.results = temp.concat(temp2)
      this.setState({data: data, nextData: response.next, dataLoaded: true, loading: false})
    }
  }

  renderFooter = () => {
    let {loading, nextData} = this.state
    if (nextData==null){
      return(
        <View style={{paddingVertical: 10, alignItems:'center'}}>
            <Text style={{fontSize: 20, color: 'cornflowerblue'}}>No More Posts ):</Text>
        </View>
      )
    }else if (!loading){
      return null;
    } else {
      return (<View style={{paddingVertical: 10}}><ActivityIndicator animating size="large" /></View>)
    }
  }

  componentDidMount(){
    this.fetchPostData()
    // Get user area info
    this.fetchUserAreaInfo()
  }
  async fetchUserAreaInfo(){
    let {login, baseAPI} = this.state;
    let apiRoute = baseAPI + 'user-areas/me';
    let access_token = login.access_token;
    let response = await fetchGet(apiRoute, access_token)
    this.props.dispatch(updateAreaData(response))
  }


  async fetchPostData(){
      let {id, login, baseAPI} = this.state;
      let apiRoute = baseAPI + 'post/';
      let access_token = login.access_token;
      let response = await fetchGet(apiRoute, access_token)
      this.setState({data: response, dataLoaded: true, nextData: response.next, refreshingPosts: false, initialLoad: false})
  }
  render(){
    let {modalAddPost, modalAddTick, refreshingPosts, data, initialLoad, open} = this.state
    return (
        <View style={app_styles.screen}>
            <View style={{alignItems: 'center', height: '100%'}}>
                {/* <Text style={styles.textHeader}>Recommended Feed</Text> */}
                {data ? 
                  <FlatList 
                    data={data.results}
                    renderItem={({ item }) => 
                        <View style={{paddingBottom: 25}}>
                          <PostFilter data={item} />
                        </View>
                      
                    }
                    onEndReached={() => this.loadMorePosts()}
                    onEndReachedThreshold={.1}
                    refreshing={refreshingPosts}
                    onRefresh={() => this.refreshPosts()}
                    keyExtractor={item => item.id.toString(8)}
                    ListFooterComponent={this.renderFooter}
                  />
                : 
                    <View>
                      {initialLoad ? 
                        <ActivityIndicator animating size="large"/>
                      :
                        <Text>Can't load any posts ):</Text>
                      }
                      
                    </View>
                }
            </View>

          {/* All the modals you can open */}
          <View>
            <AddPostModal 
              modalVisible={modalAddPost}
              closeModal={() => this.setState({modalAddPost: false})} 
            />
            <AddTickModal 
              modalVisible={modalAddTick}
              closeModal={() => this.setState({modalAddTick: false})} 
            />
          </View>
          <FAB.Group
             open={open}
             icon={open ? 'minus' : 'plus-outline'}
             color={'white'}
             fabStyle={{backgroundColor: 'cornflowerblue'}}
             actions={[
               { icon: 'camera', label: 'Create Post', onPress: () => this.setState({modalAddPost: true})},
               { icon: 'map', label: 'Create Tick', onPress: () => this.setState({modalAddTick: true,})},
             ]}
             onStateChange={() => this.setState({open: !open})}
           />
        </View>

    );
  }
}
export default connect(mapStateToProps)(HomeScreen)

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
});
