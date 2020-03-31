import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SearchBar, ButtonGroup, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import WrapComp from '../components/Search/Wrap'

const mapStateToProps = state => (
  {
    login: state.login,
  }
)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: this.props.login.access_token,
            search: '',
            selectedIndex: 0,
            searchCat: "Users",
            placeholder: "Username",
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            fetchData: {results: []},
            dataFetched: false,
            nextData: false,
            prevData: false,
        };
        this.updateIndex = this.updateIndex.bind(this)
    }
    
    async loadUserData(apiPath){
        this.setState({dataFetched: false, prevData: false, nextData: false})
        try {
          //Assign the promise unresolved first then get the data using the json method.
          const response = await fetch(apiPath, {
            headers: {
                'Authorization': 'Bearer ' + this.state.access_token,
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
              this.setState({dataFetched: true, fetchData: responseData, prevData: responseData.previous, nextData: responseData.next})
          })
          .done();
        } catch(err) {
            alert("Error with data -----------" + err);
        }
    }

    searchItem = () => {
        let {search, searchCat, baseAPI} = this.state
        let apiRoute = baseAPI
        if(searchCat == "Users"){
            apiRoute = apiRoute + 'users/?search=' + search
        }else if(searchCat == "Areas"){
            apiRoute = apiRoute + 'areas/?name=' + search
        }else{
            apiRoute = apiRoute + 'routes/?name=' + search
        }
        this.loadUserData(apiRoute)

    };
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
            searchCat = "Areas"
            placeholder = "Gym/Area Name"
        }else{
            searchCat = "Routes"
            placeholder = "Route Name"
        }
        this.setState({selectedIndex, searchCat: searchCat, placeholder: placeholder})
    }
    viewNextResults = (apiPath) => {
        this.loadUserData(apiPath)
    }
    viewPrevResults = (apiPath) => {
        this.loadUserData(apiPath)
    }
    render(){
        let { search, fetchData, searchCat, selectedIndex, placeholder, dataFetched, prevData, nextData } = this.state;
        // alert('render: '  + JSON.stringify(fetchData))
        
        const buttons = [<Text>Users</Text>, <Text>Area</Text>,<Text>Routes</Text>]
        return (
            <ScrollView >
                <View style={{paddingTop: 25, alignItems: 'center', backgroundColor: 'white'}}>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 50, width: windowWidth*.95, borderColor: 'black'}}
                        innerBorderStyle={{color: 'black'}}
                    />
                    <View style={{width: windowWidth*.9, flexDirection: 'row'}}>
                        <View style={{width: windowWidth*.7}}>
                            <SearchBar
                                placeholder={placeholder}
                                onChangeText={this.updateSearch}
                                onCancel={() => this.clearSearch()}
                                platform='default'
                                value={search}
                                inputStyle={{backgroundColor: 'white'}}
                                containerStyle={{backgroundColor: 'white', height: 60, borderWidth: 1, borderRadius: 5}}
                                inputContainerStyle={{backgroundColor: 'white'}}
                                // placeholderTextColor={'#g5g5g5'}
                            />
                        </View>
                        <View style={{width: windowWidth*.2, paddingLeft: 1}}>
                            <Button title='Search' onPress={this.searchItem} buttonStyle={{width: windowWidth*.2, height: 60, borderRadius: 5}}/>
                        </View>
                    </View>
                    <View style={{width: '90%', paddingBottom: 20}}>
                        {dataFetched ? 
                            <View>
                                <WrapComp searchCat={searchCat} data={fetchData} />

                                <View style={{flexDirection: 'row', padding: 10}}>
                                    {prevData ? 
                                        <TouchableOpacity onPress={() => this.viewPrevResults(fetchData.previous)} style={{alignItems: 'center',}}>
                                            <Text style={styles.loadNextData}>Load Previous</Text>
                                        </TouchableOpacity> 
                                    : null}
                                    {nextData ? 
                                        <TouchableOpacity onPress={() => this.viewNextResults(fetchData.next)} style={{alignItems: 'center', marginLeft: 'auto'}}>
                                            <Text style={styles.loadNextData}>Load Next</Text>
                                        </TouchableOpacity> 
                                    : null}
                                </View>
                            </View>
                            : null 
                        }
                    </View>
                    
                </View>
            </ScrollView>


    );
    }
}
export default connect(mapStateToProps)(SearchScreen)

const styles = StyleSheet.create({
    loadNextData: {
        color: 'dodgerblue', 
        fontWeight: 'bold', 
        fontSize: 20}
});
