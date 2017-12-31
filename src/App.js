import React, { Component } from 'react';
import {Platform, AsyncStorage} from 'react-native';
import { createStore,applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import ReducersCombined from './Reducers/Index';
import RouterComponent from './Routes'
export default class App extends Component{
  constructor(props){
    super(props);
  }

  async componentDidMount() {

            await FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
          AsyncStorage.setItem('Device_Token', JSON.stringify(token));                   
            console.log(token)
            // store fcm token in your server
        });

        FCM.on(FCMEvent.RefreshToken, (token) => {
          console.log(token,'got this one')
          // fcm token may not be available on first load, catch it here
        });
        
        FCM.on(FCMEvent.Notification, async (notif) => {
          // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
          if(notif.local_notification){
            console.log("local notification")
            //this is a local notification
          }
          if(notif.opened_from_tray){
            // alert(JSON.stringify(notif))
            console.log('notifgdssfhjdhjdsfh',notif)
            //iOS: app is open/resumed because user clicked banner
            //Android: app is open/resumed because user clicked banner or tapped app icon
          }
          // await someAsyncCall();
        
          if(Platform.OS ==='ios'){
            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
              case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
              case NotificationType.NotificationResponse:
                notif.finish();
                break;
              case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
            }
          }
        });
        
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
        });
        
        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif=>{
           console.log(notif)
        });
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
  }
  
  configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware
        ),
    );
    return createStore(ReducersCombined, initialState, enhancer);
}

render(){
    const store= this.configureStore({});
    return(
      <Provider store={store}>
          <RouterComponent/>
      </Provider>
    );
  }
}
