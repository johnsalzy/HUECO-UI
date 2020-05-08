import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';


//Import files/componenets
import {details} from '../../assets/styles/text';
import RouteResult from '../Routes/RouteResult';
import { fetchGet } from '../../functions/api'

//Page Constants
const windowWidth = Dimensions.get('window').width;


class RouteList extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        nextData: this.props.apiRoute,
        loading: false,
        horizontal: this.props.horizontal,
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
      return <View style={{paddingBottom: 25}}></View>;
    }else if (!loading){
      return null;
    } else {
      return (<View style={{paddingBottom: 25}}><ActivityIndicator animating size="large" /></View>)
    }
  }


  render(){
    let { data, horizontal } = this.state
    return (
        <View>
            <View>
                <FlatList 
                    data={data.results}
                    renderItem={({ item }) => 
                        <View style={{alignItems: 'center', maxWidth: windowWidth*.9}}>
                            <RouteResult scroll={'column'} data={item}/>
                        </View>
                    }
                    horizontal={horizontal}
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