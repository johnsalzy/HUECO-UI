import * as React from 'react';
import { Text, Image, View, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';


// Import our comps
import Icon from '../components/Ionicon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class MediaPickerComp extends React.Component {
  state = {
    image: null,
    result: {type: null},
    caption: null,
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
      quality: 1,  // 0-1(max)
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({ result: result, image: result.uri });
      this.props.propSetImage(result)
    }
  };

  removeImage(){
    this.setState({image: null, result: {type: null}, caption: null})
    this.props.deleteMedia()
  }

  render() {
    let { image, result } = this.state;
    // alert(JSON.stringify(this.state))
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Display if type is image */}
        {result.type == 'image' &&
            <View>
                <View style={styles.image}>
                    <Image source={{ uri: image }} style={{ width: windowWidth*.7, height: windowHeight*.6 }} />
                </View>
                <TextInput style={styles.mediaDescription} 
                    placeholder='Media Caption(Optional)'
                    onChangeText = {(caption) => this.props.setCaption(caption)}
                    value = {this.props.caption}
                />
            </View>
        }
        {/* Display if type is video */}
        {result.type == 'video' && 
          <View >
            <View style={styles.image}>
              <Video
                //'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                source={{ uri: result.uri}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                useNativeControls
                isLooping
                style={{ width: windowWidth*.7, height: windowHeight*.6 }}
              />
            </View>
            <TextInput style={styles.mediaDescription} 
              placeholder='Media Caption(Optional)'
              onChangeText = {(caption) => this.props.setCaption(caption)}
              value = {this.props.caption}
            />
          </View>
        }
        {/* Display add/remove button */}
        {image ?             
          <TouchableOpacity onPress={() => this.removeImage()}>
              <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>Remove Media</Text>
          </TouchableOpacity>
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
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    mediaDescription: {
      borderWidth: 2,
      backgroundColor: 'antiquewhite',
      borderColor: 'black',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      paddingLeft: 10,
    }
});