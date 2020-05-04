import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';
import { fetchGet } from '../../functions/api';
import { ActivityIndicator } from 'react-native-paper';

  
const mapStateToProps = state => (
  {
    stats: state.stats
  }
)

class RouteComments extends Component {
  constructor(props){
    super(props);
    this.state= {
      type: this.props.type,
      id: this.props.id,
      loading: true,
      comments: [],
    }
  }
  async componentDidMount(){
    //   Fetch route comments
    let {id} = this.state;
    let comments = await fetchGet('climbing/tick/comments/?route=' + id)
    this.setState({comments: comments, loading: false})
    console.log('Route Comments', id, comments)
  }

  render(){
    let { comments, loading } = this.state;
    // alert('this.state render ' + JSON.stringify(this.state.data))
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Comments</Text>
            {comments.length > 0 ? 
                <View>
                  {comments.map((comment, key) => (
                    <Text key={key}>@Name/comment/picture</Text>
                  
                  ))}
                </View>
            : 
              <View>
                {loading ? 
                  <ActivityIndicator size={'medium'} animating/>
                :
                  <Text style={{color: 'cornflowerblue'}}>No Comments :(</Text>
                }
                
              </View>
            }
        </View>
    );
  }
}
export default connect(mapStateToProps)(RouteComments)


const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});