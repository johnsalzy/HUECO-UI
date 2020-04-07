import React from "react";
import { Image, View, ActivityIndicator, Text } from 'react-native';

import { loaders } from '../assets/styles/styles';

class ImageWithLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        loading: true,
        data: this.props.data,
        error: false,
    };
  }

  render() {
      let { loading, data, error } = this.state
        return (
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    overflow: "hidden"
                }}
            >
                {loading && 
                    <ActivityIndicator 
                        style={{width: '100%', height:'100%', justifyContent: "center", alignItems: 'center'}}
                        size="large" color="#0000ff"
                    /> 
                }
                {error && 
                    <Text style={{textAlign: 'center'}}>Could Not Load Image.</Text>
                }
                <Image 
                    source={{'uri': data.media.thumbnail}}
                    onLoad={() => this.setState({loading: false})}
                    onError={() => this.setState({loading: false, error: true})}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
                
            </View>
        );
  }
}
export default ImageWithLoader;