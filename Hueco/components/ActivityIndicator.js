// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ActivityIndicator
} from "react-native";




class Activity extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataFetched: this.props.dataFetched,
            
        };
    }

    render() {
        let { dataFetched } = this.state
        return (
            <View>
                {!dataFetched && <ActivityIndicator animating size='large'/>}
            </View>
        );
    }
}
export default (Activity);

