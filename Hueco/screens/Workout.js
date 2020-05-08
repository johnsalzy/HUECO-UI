import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Button,
    ScrollView,
    Dimensions,
    StyleSheet
} from "react-native";
import {connect} from 'react-redux';

//Import Component/Store/etc.
import { fetchGet } from '../functions/api';
import RouteList from '../components/Walls/RouteList'
import AddTodo from '../redux/containers/AddTodo';
import VisableTodos from '../redux/containers/VisableTodos';
import {app_styles} from '../assets/styles/universal';
import { details } from '../assets/styles/text';


//Page Constants
const windowWidth = Dimensions.get('window').width;
const mapStateToProps = state => (
  {
    areas: state.areas,
  }
)

class Workout extends Component {
  constructor(props){
    super(props);
    this.state = {
        areas: this.props.areas,
        new_routes: {count: 0},
        pinned_area: {area: {name: ""}},
    };
  } 
  getPinnedArea(){
    // Get pinned area
    let { areas } = this.state;
    let pinned_area = ""
    for(const area in areas.area_data){
      if(areas.area_data[area].selected){
        pinned_area = areas.area_data[area]
        break
      }
    }
    return pinned_area
  }


    async componentDidMount(){
      let pinned_area = this.getPinnedArea()
      // Get new routes in pinned area
      let response = await fetchGet('routes/recent/')
      this.setState({new_routes: response, pinned_area: pinned_area})
    }

    async componentDidUpdate(){
      // Check if areas is updated so we can get new routes in the area
      let { pinned_area } = this.state;
      let new_pinned_area = this.getPinnedArea()
      if(pinned_area != new_pinned_area){
        let response = await fetchGet('routes/recent/')
        this.setState({new_routes: response, pinned_area: new_pinned_area})
      }
    }

    render() {
      let {new_routes, pinned_area} = this.state;
        return (
            <View style={app_styles.screen2}>
                <View>
                  {new_routes.count > 0  ?
                      <View style={{overflow: 'hidden', marginTop: 5, marginBottom: 20, maxHeight: 160, }}>
                          <Text style={details.not_found}>New Routes In {pinned_area.area.name}</Text>
                          <View style={{alignItems: 'center'}}>
                            <RouteList 
                                horizontal={true}
                                data={new_routes} 
                                apiRoute={new_routes.next}
                            />
                          </View>
                      </View>
                  :
                    <View style={{alignItems: 'center', marginTop: 20}}>
                      <Text style={details.not_found}>No Routes Found In {pinned_area.area.name}</Text>
                    </View>
                  }
                </View>
                <ScrollView style={{maxHeight: '40%'}}> 
                    <AddTodo />
                    <Text style={{fontSize:20, paddingLeft: '5%', alignContent: 'center', fontWeight: 'bold'}}>
                      Dispaly List
                    </Text>
                  <VisableTodos />
                </ScrollView>
            </View>
        );
    }
}
export default connect(mapStateToProps)(Workout);

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