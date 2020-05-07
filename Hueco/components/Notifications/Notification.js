import React from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';

import { registerForPushNotificationsAsync } from './getPermission';
import UserView from '../Modals/ModalView';
import PostView from '../Modals/ViewPost';
export default class Notification extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
    modalRouteVisable: false,
    modalUserVisable: false,
    modalPostVisable: false,
  };

  async componentDidMount() {
    let response = await registerForPushNotificationsAsync();
    if(response.expoPushToken){ this.setState({expoPushToken: response.expoPushToken})}
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    if(notification.origin == "selected"){
      if(notification.data.type == "post"){this.setState({modalPostVisable: true, notification: notification})}
      else if(notification.data.type == "route"){this.setState({modalRouteVisable: true, notification: notification})}
      else if(notification.data.type == "user"){this.setState({modalUserVisable: true, notification: notification})}
    }
  };

  render() {
    let { modalUserVisable, modalPostVisable, modalRouteVisable, notification } = this.state;
    return (
      <View>
        {modalUserVisable && <UserView data={ {id: notification.data.id}} type={'user'} closeModal={() => this.setState({modalUserVisable: false})}/>}
        {modalRouteVisable && <UserView data={ {id: notification.data.id}} type={'route'} closeModal={() => this.setState({modalRouteVisable: false})}/>}
        {modalPostVisable && <PostView post_id={notification.data.id} closeModal={() => this.setState({modalPostVisable: false})}/>}
      </View>
    );
  }
}