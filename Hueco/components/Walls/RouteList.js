import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';



//Import files/componenets

import { buttons, dividers, avatars, containers, info, text_input } from '../../assets/styles/styles';
import {details} from '../../assets/styles/text';
import ModalView from '../Modals/ModalView';
import { fetchGet } from '../../functions/api'




class RouteList extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        nextData: this.props.apiRoute,
        loading: false,
        profileModal: false,
        modalData: null,
    };
  }
  async loadMoreData(){
    
    let {nextData} = this.state;
    this.setState({loading: true})
    let data = {...this.state.data}
    if(nextData && data){
      let apiRoute = nextData;
      let response = await fetchGet(apiRoute)
      let temp = data.results
      let temp2 = response.results
      data.results = temp.concat(temp2)
      this.setState({data: data, nextData: response.next, loading: false})
    }
  }

  renderFooter = () => {
    let {loading, nextData} = this.state
    if (nextData==null){
      return(
        <View style={{height: '10%', alignItems:'center', paddingBottom: 25,}}>
            <Text style={details.not_found}>No More Routes ):</Text>
        </View>
      )
    }else if (!loading){
      return null;
    } else {
      return (<View style={{paddingBottom: 10}}><ActivityIndicator animating size="large" /></View>)
    }
  }


  render(){
    let { data, profileModal, modalData } = this.state
    return (
        <View>
            {/* Profile/Route Modal */}
            {profileModal && 
                <ModalView 
                    data={modalData} 
                    type={'route'}
                    closeModal={() => this.setState({profileModal: false})} 
                    modalVisable={profileModal}
                />
            }
            <View style={{height: '100%'}}>
                <FlatList 
                    data={data.results}
                    renderItem={({ item }) => 
                        <View style={{paddingBottom: 5}}>
                            <TouchableOpacity
                                onPress={() => this.setState({profileModal: true, modalData: {id: item.id}})}
                            >
                                <View style={containers.small_search_result}>
                                    <View style={styles.flexRow}>
                                        <Image style={avatars.small}
                                            source={{uri: item.img_url}}
                                        />
                                        <Text style={info.user_search_info}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    onEndReached={() => this.loadMoreData()}
                    onEndReachedThreshold={.1}
                    keyExtractor={item => item.id.toString(8)}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        </View>
    );
  }
}
export default RouteList

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: '100%', 
        height: '100%', 
        marginTop: 0,
        marginLeft: 0,
        padding: 10,
        borderRadius: 4,
    },
    flexRow: {
        flexDirection: 'row',
    },
});