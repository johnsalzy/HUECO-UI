import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { fetchGet } from '../../functions/api';
import { ActivityIndicator } from 'react-native-paper';

import ModalView from '../Modals/ModalView';
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
      modalVisable: false,
      userId: null,
    }
  }
  async componentDidMount(){
    //   Fetch route comments
    let {id} = this.state;
    let comments = await fetchGet('climbing/tick/comments/?route=' + id)
    this.setState({comments: comments, loading: false})
  }

  render(){
    let { comments, loading, modalVisable, userId } = this.state;
    // alert('this.state render ' + JSON.stringify(this.state.data))
    return (
        <View style={{alignItems: 'center', paddingBottom: 10, paddingHorizontal: 25}}>
            <Text style={styles.title}>Comments</Text>
            {modalVisable && <ModalView type={'user'} data={{id: userId}} closeModal={() => this.setState({modalVisable: false})}/>}
            {comments.length > 0 ? 
                <View>
                  {comments.map((comment, key) => (
                    <View key={key} style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => this.setState({userId: comment.user.id, modalVisable: true})}>
                        <Text style={{fontWeight: 'bold'}}>@{comment.user.username} </Text>
                      </TouchableOpacity>
                      <Text style={{maxWidth: '100%'}}>{comment.comment}</Text>
                    </View>
                    
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