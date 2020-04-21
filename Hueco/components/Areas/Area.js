import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

// Import
import {app_styles} from '../../assets/styles/universal'
import {fetchDelete, fetchPost} from '../../functions/api'
import AreaModal from './AreaModal';
import DispArea from './DisplayArea';
import { updateAreaData } from '../../redux/actions'

const mapStateToProps = state => (
  {
    login: state.login,
    areas : state.areas,
  }
)


class AreaView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            areas: this.props.areas,
            areaModal: false,
            modalData: null,
        };

    }
    async setMainArea(id){
      let { areas } = this.state;
      for (var i=0; i < areas.area_data.length; i++) {

        if(areas.area_data[i].area.id == id){
          areas.area_data[i].selected = true
        } else {
          areas.area_data[i].selected = false
        }
      }
      // API call 
      let apiRoute = 'user-areas/'
      let body = {selected: true, area: id}
      let response = await fetchPost(apiRoute, body)
      this.setState({areas, response: response})
      this.props.dispatch(updateAreaData(areas.area_data))
    }

    async subscribeToArea(data, type){
      let { areas } = this.state;
      let apiRoute = "";
      let selected = false;

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
        if(area_count == 0){
          selected = true
        } else if (area_count >= 10) {
          alert("You can't have more than 10 areas!")
          return
        }
        areas.area_data.push({selected: selected, area: data})
        // call api to subscribe
        let apiRoute = 'user-areas/'
        let newData = {selected: selected, area: data.id}
        let response = await fetchPost(apiRoute, newData)
        this.setState({areas, response: response})
        this.props.dispatch(updateAreaData(areas.area_data))
      } else {
        // TO LEAVE AN AREA
        for (var i=0; i < areas.area_data.length; i++) {
          if(areas.area_data[i].area.id == data.id){
            areas.area_data.splice(i, 1)
            // Remove selected area call
            apiRoute = 'user-areas/unsub/?area=' + data.id
            let response = await fetchDelete(apiRoute)
            this.setState({areas, response: response})
            this.props.dispatch(updateAreaData(areas.area_data))
            break
          }
        }
      }
      


    }

    render(){
        let {data, areas, areaModal, modalData} = this.state
        return (
            <View style={{alignItems: 'center'}, app_styles.background}>
                {data.count > 0 ?
                  <View>
                      <Text style={styles.dividerInfo}>All Areas</Text>
                      {data.results.map((data, index) => (
                        <TouchableOpacity
                          onPress={() => this.setState({areaModal: true, modalData: {area: data}})}
                          key={index}
                        > 
                          <DispArea 
                            data={data} 
                            subscribed={false} 
                            selected={null}
                            subscribe={(data, type) => this.subscribeToArea(data, type)}
                          />
                        </TouchableOpacity>
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
                    <Text style={styles.dividerInfo}>Your Areas</Text>
                    {areas.area_data.map((data, index) => (
                      <TouchableOpacity
                        onPress={() => this.setState({areaModal: true, modalData: data})}
                        key={index}
                      >
                          <DispArea 
                            data={data.area} 
                            subscribed={true} 
                            selected={data.selected}
                            setMain={(id) => this.setMainArea(id)}
                            subscribe={(data, type) => this.subscribeToArea(data, type)}
                          
                          />
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                }

                {/* Area Modal */}
                {areaModal && 
                  <AreaModal 
                    data={modalData} 
                    closeModal={() => this.setState({areaModal: false})} 
                    modalVisable={areaModal}
                  />
                }
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
      },
      textButton: {
        color: 'white', 
        fontWeight: 'bold'
      }
    });