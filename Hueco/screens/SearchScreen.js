import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';
import { SearchBar, ButtonGroup, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

// Import Components
import {app_styles} from '../assets/styles/universal'
import { fetchGet } from '../functions/api';
import UserView from '../components/User/UsersSearch';
import AreaView from '../components/Areas/Area';
import RouteView from '../components/Routes/Routes';
import WallView from '../components/Walls/Walls';

// import { updateSearchData } from '../redux/actions'
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
            placeholder: "Username / Name",
            baseAPI: "http://3.133.123.120:8000/api/v1/",
            fetchData: {results: []},
            dataFetched: false,
            nextData: false,
            prevData: false,
            loading: false,
        };
        this.updateIndex = this.updateIndex.bind(this)
    }
    
    async loadUserData(apiPath){
        this.setState({dataFetched: false, loading: true, prevData: false, nextData: false})
        let responseData = await(fetchGet(apiPath))
        this.setState({dataFetched: true, fetchData: responseData, prevData: responseData.previous, nextData: responseData.next, loading: false})
    }

    searchItem = () => {
        let {search, searchCat} = this.state
        let apiRoute = ''
        let type= ''
        if(searchCat == "Users"){
            apiRoute = apiRoute + 'users/?search=' + search
            type = 'Users'
        }else if(searchCat == "Areas"){
            apiRoute = apiRoute + 'areas/?name=' + search
            type = 'Areas'
        }else if(searchCat == "Walls"){
            apiRoute = apiRoute + 'walls/?name=' + search
            type = 'Walls'
        } else{
            apiRoute = apiRoute + 'routes/?name=' + search
            type = 'Routes'
        }
        this.loadUserData(apiRoute)

    };
    updateSearch = search => {
        this.setState({ search });
    };
    clearSearch = () => {
        this.setState({ search: '' });
    };
    updateIndex (selectedIndex) {
        this.setState({dataFetched: false, prevData: false, nextData: false, fetchData: {results: []}})
        let searchCat = ''
        let placeholder = ''
        if(selectedIndex == 0){
            searchCat = "Users"
            placeholder = "Username / Name"
        }else if(selectedIndex == 1){
            searchCat = "Areas"
            placeholder = "Gym/Area Name"
            this.setState({dataFetched: true, fetchData: {results: [], recommended: true}})
        }else if(selectedIndex == 2){
            searchCat = "Walls"
            placeholder = "Wall Name"
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
        let { search, fetchData, searchCat, selectedIndex, placeholder, dataFetched, prevData, nextData, loading } = this.state;
        const buttons = [<Text>Users</Text>, <Text>Area</Text>,<Text>Walls</Text>, <Text>Routes</Text>]
        return (
            <View style={app_styles.screen}>
            <ScrollView >
                <View style={app_styles.backgroundColor, {alignItems: 'center'}}>
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
                        {loading && 
                            <View style={{paddingTop: 20}}>
                                <ActivityIndicator 
                                    style={{justifyContent: "center", alignItems: 'center'}}
                                    size="large" color="#0000ff"
                                />
                            </View>
                            
                        }
                        { dataFetched &&
                            <View>
                                {searchCat == 'Users' && <UserView data={fetchData}/>}
                                {searchCat == 'Areas' && <AreaView data={fetchData}/>}
                                {searchCat == 'Routes' && <RouteView data={fetchData}/>}
                                {searchCat == 'Walls' && <WallView data={fetchData}/>}
                                <View style={{flexDirection: 'row', padding: 10}}>
                                    {prevData &&
                                        <TouchableOpacity onPress={() => this.viewPrevResults(fetchData.previous)} style={{alignItems: 'center',}}>
                                            <Text style={styles.loadNextData}>Load Previous</Text>
                                        </TouchableOpacity> 
                                    }
                                    {nextData && 
                                        <TouchableOpacity onPress={() => this.viewNextResults(fetchData.next)} style={{alignItems: 'center', marginLeft: 'auto'}}>
                                            <Text style={styles.loadNextData}>Load Next</Text>
                                        </TouchableOpacity> 
                                    }
                                </View>
                            </View>
                        }
                    </View>
                    
                </View>
            </ScrollView>
            </View>

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
