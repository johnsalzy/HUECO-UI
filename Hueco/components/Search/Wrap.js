import * as React from 'react';
import { View } from 'react-native';

// Import Components
import UserView from './Users';
import AreaView from '../Areas/Area';
import RouteView from '../Routes/Routes';
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
                {category == 'Users' && <UserView data={data}/>}
                {category == 'Areas' && <AreaView data={data}/>}
                {category == 'Routes' && <RouteView data={data}/>}
                {category == 'Walls' && <WallView data={data}/>}
            </View>
        );
    }
}
export default SearchScreen
