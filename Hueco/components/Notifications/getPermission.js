import { Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { fetchPost } from '../../functions/api';

export async function registerForPushNotificationsAsync(){
    let response = {expoPushToken: null}
    let token = ""
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return response;
      }
      token = await Notifications.getExpoPushTokenAsync();
      response.expoPushToken = token;
      let body = {enabled: true, token: token, sound: true}
      let respFetch = await fetchPost('notifcation-settings/change/', body)
    } else {
    //   alert('Must use physical device for Push Notifications');
      return response
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    return response
};