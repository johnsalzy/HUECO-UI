import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Divider } from 'react-native';
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

// Import
import {app_styles} from '../../assets/styles/universal'
import { buttons } from '../../assets/styles/styles';
import {search_results} from '../../assets/styles/styles'
import {fetchGet, fetchPost, fetchDelete} from '../../functions/requests'
import Icon from '../Ionicon';

const mapStateToProps = state => (
  {
    login: state.login,
    areas : state.areas,
    api: state.api,
  }
)

class DisplayArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        subscribed: this.props.subscribed,
        selected: this.props.selected,
    };
  }
  render(){
    let { data, subscribed} = this.state;
    return(
      <TouchableOpacity
        onPress={() => alert('open area modal for ' + data.id)}
      >
        <View style={styles.container}>
            <View style={search_results.resultContainer}>
                <View style={styles.headerContent}>
                    <View>
                      <View style={{flexDirection: 'row', width: '100%',}}>
                        <Text style={styles.name}>{data.name}</Text>
                        {this.props.selected && 
                          <Tooltip popover={<Text>Pinned As Main Area</Text>}>
                            <Icon name={'place'} size={20} color={'cornflowerblue'}/>
                          </Tooltip>
                        }
                      </View>
                      
                      <View style={{alignItems: 'center', alignSelf: 'center'}}>
                        {subscribed ? 
                          <View>
                            <TouchableOpacity
                                style={buttons.delete}
                                onPress={() => this.props.subscribe(data, 'leave')}
                            >
                              <Text style={{color: 'white', fontWeight: 'bold',}}>Remove Pin</Text>
                            </TouchableOpacity>
                            {! this.props.selected && 
                              <TouchableOpacity
                                onPress={() => this.props.setMain(data.id)}
                              >
                                <Text>Pin as Main Area</Text>
                              </TouchableOpacity>
                            }
                            
                          </View>
                        :
                            <View>
                                <TouchableOpacity
                                    style={buttons.add}
                                    onPress={() => this.props.subscribe(data, 'join')}
                                >
                                  <Text style={{color: 'white', fontWeight: 'bold',}}> Pin Area </Text>
                                </TouchableOpacity>
                            </View>
                        }
                      </View>
                    </View>

                    {data.location ? 
                      <Text style={styles.userInfo}>Location: {data.location} </Text>
                    :
                    <Text style={styles.userInfo}>Location: Unknown</Text>
                    }
                    {data.description && 
                      <Text style={styles.userInfo}>Description: {data.description} </Text>
                    }
                    
                    <Text>{JSON.stringify(data)}</Text>
                </View>
            </View>
        </View>
      </TouchableOpacity>

    );
  }
}


class AreaView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            areas: this.props.areas,
            access_token: this.props.login.access_token,
            baseAPI: this.props.api.baseAPI,
        };

    }
    async setMainArea(id){
      //Update props, state
      let { areas, baseAPI, access_token } = this.state;
      for (var i=0; i < areas.area_data.length; i++) {

        if(areas.area_data[i].area.id == id){
          areas.area_data[i].selected = true
        } else {
          areas.area_data[i].selected = false
        }
      }
      // API call 
      let apiRoute = baseAPI + 'user-areas/'
      let headers = {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      }
      let body = {selected: true, area: id}
      let response = await fetchPost(apiRoute, headers, body)
      alert('res' + JSON.stringify(response))
      this.setState({areas})

    }

    async subscribeToArea(data, type){
      let { areas, baseAPI, access_token } = this.state;
      let apiRoute = baseAPI;

      if(type == 'join'){
        //Check if already subscribed to area
        let area_count = areas.area_data.length;
        for (var i=0; i < area_count; i++) 
        {
          if(areas.area_data[i].area.id == data.id){
            alert('You are already subscribed to this area!')
            return
          }
        }
        let newData = {selected: false, area: data}
        
        if(area_count == 0){
          newData.selected = true
        } else if (area_count >= 10) {
          alert("You can't have more than 10 areas!")
          return
        }
        areas.area_data.push(newData)
        // call api to subscribe
        let apiRoute = baseAPI + 'user-areas/'
        let headers = {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        }
        let response = await fetchPost(apiRoute, headers, newData)
        alert('res' + JSON.stringify(response))

        // Update props

      } else {
        // TO LEAVE AN AREA
        for (var i=0; i < areas.area_data.length; i++) {
          if(areas.area_data[i].area.id == data.id){
            areas.area_data.splice(i, 1)
            // Remove selected area call
            apiRoute = apiRoute + 'user-areas/' + '2' + '/'
            console.log('api route ' + apiRoute)
            let response = await fetchDelete(apiRoute, access_token)
            alert('res' + JSON.stringify(response))
            break
          }
        }
      }
      this.setState({areas})
      // Push update to props


    }

    render(){
        let {data, areas} = this.state
        return (
            <View style={{alignItems: 'center'}, app_styles.background}>
                {data.count > 0 ?
                  <View>
                      <Text style={styles.dividerInfo}>Areas You Can Add</Text>
                      {data.results.map((data, index) => (
                        <View key={index}>
                          <DisplayArea data={data} 
                            subscribed={false} 
                            selected={null}
                            subscribe={(data, type) => this.subscribeToArea(data, type)}/>
                        </View>
                      ))}
                  </View>
                : 
                  <View>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>No Areas Found :(</Text> 
                  </View>
                }

                {/* View users current areas */}
                {areas.area_data.length > 0 &&
                  <View>
                    <Text style={styles.dividerInfo}>Your Current Areas</Text>
                    {areas.area_data.map((data, index) => (
                      <View key={index}>
                        <DisplayArea 
                          data={data.area} 
                          subscribed={true} 
                          selected={data.selected}
                          setMain={(id) => this.setMainArea(id)}
                          subscribe={(data, type) => this.subscribeToArea(data, type)}
                        
                        />
                      </View>
                    ))}
                  </View>
                }
                <Text>{JSON.stringify(areas)}</Text>
            </View>
        );
    }
}
export default connect(mapStateToProps)(AreaView)



const styles = StyleSheet.create({

    //   For Profile 
      container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 5,
        width: '100%'
      },
      headerContent:{
        padding:10,
        alignItems: 'center',
      },
      name:{
        fontSize:20,
        color:"#000000",
        fontWeight:'600',
        textAlign: 'center'
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      dividerInfo: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 5,
        color: 'cornflowerblue',
      }
    });