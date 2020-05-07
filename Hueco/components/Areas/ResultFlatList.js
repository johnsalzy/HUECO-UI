import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';



//Import files/componenets
import {app_styles} from '../../assets/styles/universal';
import {details} from '../../assets/styles/text';
import WallModal from '../Walls/WallModal';
import { fetchGet } from '../../functions/api'




class ResultFlatList extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        nextData: this.props.apiRoute,
        loading: false,
        wallModal: false,
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
            <Text style={details.not_found}>No More Walls ):</Text>
        </View>
      )
    }else if (!loading){
      return null;
    } else {
      return (<View style={{paddingBottom: 10}}><ActivityIndicator animating size="large" /></View>)
    }
  }


  render(){
    let { data, wallModal, modalData } = this.state
    return (
        <View style={{height: '100%'}}>
            <FlatList 
                data={data.results}
                renderItem={({ item }) => 
                    <View style={{paddingBottom: 5}}>
                        <TouchableOpacity
                            onPress={() => this.setState({modalData: item, wallModal: true})}
                        >
                            <View style={{borderWidth: 2, borderColor: 'black', borderRadius: 4, paddingVertical: 10}}>
                                <Text style={{fontWeight: 'bold', paddingLeft: 10}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                    
                }
                onEndReached={() => this.loadMoreData()}
                onEndReachedThreshold={.1}
                keyExtractor={item => item.id.toString(8)}
                ListFooterComponent={this.renderFooter}
            />
            {/* Wall Modal */}
            {wallModal && 
                <WallModal 
                    data={modalData} 
                    closeModal={() => this.setState({wallModal: false})} 
                    modalVisable={wallModal}
                />
            }
        </View>
    );
  }
}
export default ResultFlatList

