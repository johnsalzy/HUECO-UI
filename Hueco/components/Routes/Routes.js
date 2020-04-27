import * as React from 'react';
import { Text, View } from 'react-native';

// Import
import {app_styles} from '../../assets/styles/universal'
import RouteResult from '../Routes/RouteResult';

export default class RouteView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
        };

    }
    render(){
        let { data } = this.state
        return (
            <View>
                {data.count > 0 ?
                  data.results.map((data, index) => (
                        <RouteResult key={index} data={data}/>
                  ))
                : 
                  <Text>No Routes Found :(</Text> 
                }
            </View>
        );
    }
}