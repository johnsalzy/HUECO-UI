import * as React from 'react';
import { View } from 'react-native';

// Import Components
import UserView from './Users';
import AreaView from './Area';
import RouteView from './Routes';
import WallView from './Walls';



class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: this.props.login.access_token,
            category: this.props.searchCat,
            data: this.props.data
        };

    }
    

    render(){
        let {category, data} = this.state
        return (
            <View style={{paddingTop: '2%'}}>
                {category == 'Users' ? <UserView data={data}/>: null}
                {category == 'Areas' ? <AreaView data={data}/>: null}
                {category == 'Routes' ? <RouteView data={data}/>: null}
                {category == 'Walls' ? <WallView data={data}/>: null}
            </View>
        );
    }
}
export default SearchScreen
