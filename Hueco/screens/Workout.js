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

//Import Component/Store/etc.
import { fetchGet } from '../functions/api';
import RouteList from '../components/Walls/RouteList'
import AddTodo from '../redux/containers/AddTodo';
import VisableTodos from '../redux/containers/VisableTodos';
import {app_styles} from '../assets/styles/universal';
import { details } from '../assets/styles/text';


//Page Constants
const windowWidth = Dimensions.get('window').width;

class Workout extends Component {
  constructor(props){
    super(props);
    this.state = {
        new_routes: {count: 0}
    };
  } 

    async componentDidMount(){
      let response = await fetchGet('routes/recent/')
      this.setState({new_routes: response})
    }


    render() {
      let {new_routes} = this.state;
        return (
            <View style={app_styles.screen}>
                <View style={{height: '60%'}}>
                  {new_routes.count > 0  ?
                      <View style={{height: '100%', overflow: 'hidden', marginTop: 5, marginBottom: 20, }}>
                          <Text style={details.not_found}>New Routes In Area</Text>
                          <RouteList 
                              data={new_routes} 
                              apiRoute={new_routes.next}
                          />

                      </View>
                  :
                    <View style={{alignItems: 'center', marginTop: 20}}>
                      <Text style={details.not_found}>No Routes Found In Your Pinned Area</Text>
                    </View>
                  }
                </View>
                <ScrollView style={{height: '40%'}}> 
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
export default Workout;

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