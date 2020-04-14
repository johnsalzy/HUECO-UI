// Import needed Libs
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {connect} from 'react-redux';
import { Tooltip } from 'react-native-elements';

// Imports of app libraries
import Icon from '../../Ionicon';
import { fetchGet, fetchPatchMedia } from '../../../functions/api'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;


const mapStateToProps = state => (
    {
      login: state.login,
    }
)

class Achievements extends Component {
    constructor(props){
        super(props);
        this.state = {
            changed: false,
            id: this.props.user_id,
            data: null,
            loading: false,
        };
    }

    async componentDidMount(){
        let { id } = this.state;
        let response = await fetchGet('social/user-achievement/?user=' + id)
        this.setState({data: response})
    }


    render() {
        let {data} = this.state;
        return (
                <View style={{paddingTop: 5, alignSelf: 'center', width: '80%'}}>
                    <Text style={{color: 'cornflowerblue', fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>Achievements</Text>
                    <View style={{alignSelf: 'center'}}>
                        {data && 
                            <View style={{paddingTop: 20}}>
                                {data.results.map((data, index) =>
                                    <View key={index} style={{flexDirection: 'row', alignSelf: 'center'}}>
                                        <Tooltip popover={<Text>{data.achievement.description}</Text>}>
                                            <Text style={styles.has}>{data.achievement.name}</Text>
                                        </Tooltip>
                                        {data.selected ? 
                                            <Icon name={'place'} size={20} color={'dodgerblue'}/>
                                        :
                                            <TouchableOpacity
                                                onPress={() => alert('set as main' + data)}
                                            >
                                                <Text>PIN</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                
                                )}
                            </View>
                        }

                        {/* Back and forth arrows here */}
                        <Text>Next           Prev</Text>
                    </View>
                </View>
        );
    }
}
export default connect(mapStateToProps)(Achievements);

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold', 
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 5,
        color: 'darkgray'
    },
    doesNotHave: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
        textAlign: 'center'
    },
    has: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'blue',
        textAlign: 'center'
    },
});