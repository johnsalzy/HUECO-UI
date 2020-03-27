import React from 'react';
import { Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {
  View,
} from 'react-native';

export default function SocialMedia() {
  return (
    <View>
        {/* --------- Social Medias --------- */}
        <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon
                  //Social Icon using react-native-elements
                  type="facebook"
                  //Type of Social Icon
                  onPress={
                    () => {Linking.openURL('https://www.facebook.com/groups/19204046466/')}
                  }
                />
                {/* <Text style={{ textAlign: 'center' }}>angellist</Text> */}
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon
                  type="instagram"
                  onPress={
                    () => {Linking.openURL('https://www.instagram.com/uc_mountaineering/')}
                  }
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon
                  type="youtube"
                  onPress={
                    () => {Linking.openURL('https://www.youtube.com/channel/UC1zpNSpQI784F-zOtVHjUMQ')}
                  }
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon
                  type="envelope"
                  onPress={
                    () => {Linking.openURL('mailto:ucmountaineering@gmail.com')}
                  }
                />
              </View>
            </View>
        </View>
      </View>
  );
}





