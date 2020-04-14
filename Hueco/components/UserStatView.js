import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements'


// Import needed componenets
import TabIcon from './TabIcon';
import Stats from './Stats'
import Posts from './Posts/Posts'


class StatView extends Component {
  constructor(props){
    super(props);
    this.state= {
        selectedIndex: 0,
        id: this.props.id,
        type: this.props.type,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  render(){
    const buttons = [<TabIcon focused={true} name='md-camera'/>, <TabIcon name='md-stats'/>]
    const { selectedIndex, id, type } = this.state
    // alert('this.state render' + JSON.stringify(this.state))
    return (
        <View style={{width: '90%'}}>
            <View style={{alignItems: 'center'}}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50, width: '100%'}}
                />
            </View>
            <View style={{width: '100%', alignItems: 'center', alignContent: 'center'}}>
                { selectedIndex ? <Stats type={type} idUser={id} />: <Posts type={type} id={id}/> }
            </View>
        </View>
    );
  }
}
export default StatView
