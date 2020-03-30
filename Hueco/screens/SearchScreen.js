import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            selectedIndex: 0,
            searchCat: "Users",
            placeholder: "Username"
        };
        this.updateIndex = this.updateIndex.bind(this)
      }
    


    updateSearch = search => {
        this.setState({ search });
    };
    clearSearch = () => {
        alert('caancel')
        this.setState({ search: '' });
    };
    updateIndex (selectedIndex) {
        let searchCat = ''
        let placeholder = ''
        if(selectedIndex == 0){
            searchCat = "Users"
            placeholder = "Username"
        }else if(selectedIndex == 1){
            searchCat = "Location"
            placeholder = "Gym/Area Name"
        }else{
            searchCat = "Routes"
            placeholder = "Route Name"
        }
        this.setState({selectedIndex, searchCat: searchCat, placeholder: placeholder})
    }
    render(){
        const { search, selectedIndex, placeholder } = this.state;
        const buttons = [<Text>Users</Text>, <Text>Location</Text>,<Text>Routes</Text>]
        // alert('state' + JSON.stringify(this.state))
        return (
            <ScrollView>
                <View style={{paddingTop: 25, alignItems: 'center', backgroundColor: 'lightgray'}}>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 50, width: windowWidth*.95}}
                    />
                    <View style={{height: windowHeight, width: windowWidth*.9}}>
                        <SearchBar
                            placeholder={placeholder}
                            onChangeText={this.updateSearch}
                            onCancel={() => this.clearSearch()}
                            platform='default'
                            value={search}
                            inputStyle={{backgroundColor: 'white'}}
                            leftIconContainerStyle={{backgroundColor: 'white'}}
                            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                            inputContainerStyle={{backgroundColor: 'white'}}
                            // placeholderTextColor={'#g5g5g5'}
                        />
                    </View>
                    <Text>Hello!!</Text>
                    <Text>Hello!!</Text>
                    <Text>Hello!!</Text>
                    <Text>Hello!!</Text>
                    <Text>Hello!!</Text>
                    <Text>Hello!!</Text>
                </View>
            </ScrollView>


    );
    }
}






const styles = StyleSheet.create({

});
