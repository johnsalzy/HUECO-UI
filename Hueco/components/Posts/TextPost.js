import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

  


class TextPost extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: this.props.data,
        }
    }
    render(){
        let { data } = this.state;
        alert('fetchdata' + JSON.stringify(data))
        return (
            <View>
                <Text>Test Posts</Text>
            </View>
        );
  }
}
export default TextPost


const styles = StyleSheet.create({

});