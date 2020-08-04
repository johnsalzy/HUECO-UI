import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { FAB, Divider } from 'react-native-paper';


//Import files/componenets
import AddPostModal from '../components/Modals/CreatePost';
import AddTickModal from '../components/Modals/CreateTick';
import EditGymModal from '../components/Areas/EditArea/EditGym';
import {app_styles} from '../assets/styles/universal';
import {details} from '../assets/styles/text';
import PostFilter from '../components/Posts/PostFilter';
import { fetchGet } from '../functions/api';
import { setAreaData } from '../redux/actions';
import Notification from '../components/Notifications/Notification';
import AdComponent from '../components/Ad';



const mapStateToProps = state => (
  {
    login: state.login,
    api: state.api,
    areas: state.areas,
  }
);


class FlatListItem extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
      };
    }
    render(){
      let {data} = this.state;
      return(
        <View >
          {/* {data.type ? 
            <AdComponent />
          :
            <PostFilter data={data} />
          } */}
          <PostFilter data={data} />
          <Divider style={{paddingTop: 1, backgroundColor: 'cornflowerblue'}}/>
        </View>
      );
    }
  }



class HomeScreen extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
        login: this.props.login,
        modalAddTick: false,
        modalAddPost: false,
        modalEditGym: false,
        data: null,
        nextData: null,
        refreshingPosts: false,
        loading: false,
        userModal: false,
        initialLoad: true,
        baseAPI: this.props.api.baseAPI,
        open: false,
        fab_actions: [
          { icon: 'camera', label: 'Create Post', onPress: () => this.setState({modalAddPost: true})},
          { icon: 'map', label: 'Create Tick', onPress: () => this.setState({modalAddTick: true,})},
        ]
    };
  }

  refreshPosts(){
    this.setState({refreshingPosts: true})
    this.fetchPostData()
  }
  async loadMorePosts(){
    let {login, nextData, loading} = this.state;
    let data = {...this.state.data}
    if(nextData && data && !loading){      let apiRoute = nextData;
      let access_token = login.access_token;
      let response = await fetchGet(apiRoute, access_token)
      let num = Math.round(Math.random() * 1000)
      data.results.push({type: "Ad", id: num })
      let temp = data.results
      // temp.push({type: "Ad", id: 0})
      let temp2 = response.results
      data.results = temp.concat(temp2)
      this.setState({data: data, nextData: response.next, loading: false})
    }
  }

  renderFooter = () => {
    let {loading, nextData, data} = this.state
    if (nextData==null){
      return(
        <View style={{paddingVertical: 10, alignItems:'center'}}>
            
            {(!loading && data.results.length == 0) ?
              <Text style={details.not_found}>Follow Users to See Posts</Text>
            :
              <Text style={details.not_found}>No More Posts ):</Text>
            }
        </View>
      )
    }else if (!loading){
      return null;
    } else {
      return (<View style={{paddingVertical: 10}}><ActivityIndicator animating size="large" /></View>)
    }
  }

  async componentDidMount(){
    this.fetchPostData()
    // Get user area info
    this.fetchUserAreaInfo()
  }

  async fetchUserAreaInfo(){
    let apiRoute = 'user-areas/me/';
    let response = await fetchGet(apiRoute)
    let status = [];
    // Figure out is the area moderater/setter for an area
    for(const area in response){
        if(response[area].member_type > 1){
          status.push({id:response[area].area.id, name:response[area].area.name, type: response[area].member_type})
        }
    }
    this.props.dispatch(setAreaData(response, status))
    if(status.length > 0){
      this.state.fab_actions.push({ icon: 'nature', label: 'Edit Area', onPress: () => this.setState({modalEditGym: true})})
    }
  }
  async fetchPostData(){
      let apiRoute = 'post/';
      let response = await fetchGet(apiRoute)
      this.setState({data: response, nextData: response.next, refreshingPosts: false, initialLoad: false})
  }
  render(){
    let {modalAddPost, modalAddTick, modalEditGym, refreshingPosts, data, open} = this.state
    return (
        <View style={app_styles.screen2}>
            <Notification />
            <View style={{alignItems: 'center', height: '100%'}}>
                {data &&
                  <FlatList 
                    data={data.results}
                    renderItem={({ item }) => 
                      <FlatListItem data={item}/>
                    }
                    onEndReached={() => {this.setState({loading: true}); this.loadMorePosts()}}
                    onEndReachedThreshold={.1}
                    refreshing={refreshingPosts}
                    onRefresh={() => this.refreshPosts()}
                    keyExtractor={item => item.id.toString(8)}
                    ListFooterComponent={this.renderFooter}
                  />
                }
            </View>

          {/* All the modals you can open */}
          <View>
            {modalAddPost && 
              <AddPostModal 
                modalVisible={modalAddPost}
                closeModal={() => this.setState({modalAddPost: false})} 
              />
            }
            {modalAddTick && 
              <AddTickModal 
                modalVisible={modalAddTick}
                closeModal={() => this.setState({modalAddTick: false})} 
              />
            }
            {modalEditGym && 
              <EditGymModal 
                modalVisible={modalEditGym}
                closeModal={() => this.setState({modalEditGym: false})} 
              />
            }

          </View>
          <FAB.Group
             open={open}
             icon={open ? 'minus' : 'plus-outline'}
             color={'white'}
             fabStyle={{backgroundColor: 'cornflowerblue'}}
             actions={this.state.fab_actions}
             onStateChange={() => this.setState({open: !open})}
           />
        </View>

    );
  }
}
export default connect(mapStateToProps)(HomeScreen)