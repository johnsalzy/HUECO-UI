import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Divider } from 'react-native';
import {connect} from 'react-redux';


// Import
import {app_styles} from '../../assets/styles/universal'
import {search_results} from '../../assets/styles/styles'

const mapStateToProps = state => (
  {
    login: state.login,
    areas : state.areas,
  }
)

class DisplayArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
        subscribed: this.props.subscribed
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
                      <Text style={styles.name}>{data.name}</Text>
                      <View style={{alignItems: 'center', alignSelf: 'center'}}>
                        {subscribed ? 
                          <TouchableOpacity
                            onPress={() => this.props.subscribe(data, 'leave')}
                          >
                            <Text>Unsubscribe</Text>
                          </TouchableOpacity>
                        :
                        <TouchableOpacity
                          onPress={() => this.props.subscribe(data, 'join')}
                        >
                          <Text>Subscribe</Text>
                        </TouchableOpacity>
                        }
                      </View>
                    </View>
                    <Text style={styles.userInfo}>Location: needed</Text>
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
        };

    }
    setMainArea(){
      //Update props, state

    }

    subscribeToArea(data, type){
      if(type == 'join'){
        alert('subscribing to area' + data.id)
      } else {
        alert('unsubscribing to area' + data.id)
      }

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
                          <DisplayArea data={data} subscribed={false} subscribe={(data, type) => this.subscribeToArea(data, type)}/>
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
                  areas.area_data.map((data, index) => (
                    <View key={index}>
                      <Text style={styles.dividerInfo}>Your Current Areas</Text>
                      <DisplayArea data={data.area} subscribed={true} subscribe={(data, type) => this.subscribeToArea(data, type)}/>
                    </View>
                  ))
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