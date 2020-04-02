import * as React from 'react';
import { Text, Image, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// Import our comps
import Icon from '../components/Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    result: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });
    if (!result.cancelled) {
      this.setState({ result: result, image: result.uri });
    }
  };

  removeImage(){
    this.setState({image: null, result: null})
  }

  render() {
    let { image } = this.state;
    alert(JSON.stringify(this.state))
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {image ?
            <View>
                <View style={styles.image}>
                    <Image source={{ uri: image }} style={{ width: windowWidth*.7, height: windowHeight*.6 }} />
                </View>
                <TouchableOpacity onPress={() => this.removeImage()}>
                    <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>Remove Media</Text>
                </TouchableOpacity>
            </View>
            :
            <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => this._pickImage()}>
                <Icon size={30} color='black' name='add-a-photo'/>
            </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    image: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 4,
    },
});