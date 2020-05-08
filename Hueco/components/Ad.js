import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import {
  AdMobBanner,
  // AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

class AdComponent extends React.PureComponent {
  async componentDidMount(){
    await setTestDeviceIDAsync('EMULATOR');
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
          
      <View style={{width: 320, height: 100, borderRadius: 1, borderColor: 'black', borderWidth: 2, overflow: 'hidden'}}>
        <AdMobBanner
          bannerSize="largeBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds={false}
          onDidFailToReceiveAdWithError={() => console.log('Error With Banner')} 
        />
      </View>
    </View>
    );
  }
}

export default AdComponent;