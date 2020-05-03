// Import needed Libs
import React, { Component } from "react";
import {
    View
} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class AttachMedia extends Component {
    constructor(props){
        super(props);
        this.state = {
            media: null,
        };
    }
    componentDidMount(){
        this._pickImage()
    }
    // For Attaching a image
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        });
        if (!result.cancelled) {
            this.props.attachMedia(result);
        }
        this.props.cancelMedia()
    };
    render() {
        return(        
            <View>
            </View>
        )
    }
}
export default (AttachMedia);