import * as React from 'react';
import { View } from 'react-native';

// Import Components
import UserView from './Users';
import AreaView from '../Areas/Area';
import RouteView from './Routes';
import WallView from '../Walls/Walls';



class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
