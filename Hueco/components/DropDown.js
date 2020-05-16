// Import needed Libs
import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Modal,
    ScrollView,
    TouchableOpacityBase,
    TouchableWithoutFeedback,
} from "react-native";

import Icon from './Ionicon';

class DropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            expanded: false,
            selected: this.props.selected,
        };
    }
    render() {
        let { expanded, selected, defaultItem } = this.state;
        return (
            <View>
                <View style={styles.container}>
                    <Text>{this.props.selected}</Text>
                    <TouchableOpacity
                        style={{marginLeft: 'auto', backgroundColor: 'white'}}
                        onPress={() => this.setState({expanded: !expanded})}
                    >
                        <Icon size={30} name={'arrow-drop-down'}/>
                    </TouchableOpacity>
                </View>
                {/* Modal to show picker */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={expanded}
                    onRequestClose={() => this.setState({expanded: false})}
                >
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#00000080', alignItems: 'center', 
                            width: '100%', height: '100%', justifyContent: 'center'
                        }}
                        onPress={() => this.setState({expanded: false})}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{width: '80%', maxHeight: '70%',
                                backgroundColor: 'white', overflow: 'hidden', paddingVertical: 10}}>
                                <ScrollView>
                                    {this.props.data.map((item, key) => (
                                        <TouchableOpacity
                                            key={key}
                                            onPress={
                                                () => {
                                                    this.props.setSelected(item)    
                                                    this.setState({selected: item.name, expanded: false})
                                                }
                                            }
                                        >
                                            <Text style={styles.listItem}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}
export default (DropDown);


const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%', 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5, 
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5
    },
    listItem: {
        alignItems: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});
