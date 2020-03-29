import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';


  
const mapStateToProps = state => (
  {
    login: state.login,
    user: state.user,
    stats: state.stats
  }
)



class Posts extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: this.props.login.username,
            access_token: this.props.login.access_token,
            userData: this.props.user,
            postData: []
        }
    }
    async componentDidMount(){
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos`)
        const json = await response.json();
        this.setState({ postData: json.slice(1,5) });
        // alert('mount: ' + JSON.stringify(this.state.postData))
    }

    render(){

        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>This is posts page</Text>

                {this.state.postData.map((data, index) => (
                    <View style={{paddingTop: 18}} key={index}>
                        <Text >Title: {data.title}</Text>
                        <Image 
                            source={{'uri': data.url}}  
                            style={{width: 400, height: 400}} 
                        />
                    </View>
                ))}

                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>


            </View>
        );
  }
}
export default connect(mapStateToProps)(Posts)


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center',
    },
    chart: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff",
    }
});