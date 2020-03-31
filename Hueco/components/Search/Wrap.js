import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import UserView from './Users'
import AreaView from './Area'
import RouteView from './Routes'

const mapStateToProps = state => (
  {
    login: state.login,
  }
)

class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: this.props.login.access_token,
            category: this.props.searchCat,
            data: this.props.data
        };

    }
    

    render(){
        let {category, data} = this.state
        return (
            <View style={{paddingTop: '2%'}}>
                {category == 'Users' ? <UserView data={data}/>: null}
                {category == 'Areas' ? <AreaView data={data}/>: null}
                {category == 'Routes' ? <RouteView data={data}/>: null}
                
            </View>
        );
    }
}
export default connect(mapStateToProps)(SearchScreen)





const styles = StyleSheet.create({

});
