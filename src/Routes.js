import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity

} from 'react-native';
import {
  Scene,
  Router,
  Tabs,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';
import Login from './Components/Pages/LoginSection/login';
import ForgotPassword from './Components/Pages/LoginSection/ForgotPassword';
import ScanScreen from './Components/Pages/QrCode/QrCodeScanPage';
import UnderDevelopment from './Components/Pages/Underdevelopment';
import Application from './Components/Pages/FingerPrint/Application.container';
import ConfirmationPage from './Components/Pages/QrCode/ConfirmationPage';
import ValidationUnsuccessful from './Components/Pages/QrCode/validationUnsuccessfulPage';

import PadListing from './Components/Pages/QrCode/PadListing';

import ProfilePage from './Components/Pages/ProfileGroup/ProfilePage';

import DetailingPage from './Components/Pages/QrCode/DetailingPage';


const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: '#767676',
    backgroundColor: '#fafcff',

    
  },
  tabBarSelectedItemStyle: {
  },
  titlestyle: {
    color: '#666666', fontSize: 16, fontWeight: 'bold'

  },
  tab1style: {
    borderLeftWidth: 1,
    marginVertical: 5,
    borderLeftColor: '#767676'
  }

});



class TabIcon1 extends Component {
  render() {
    let source = this.props.selected ? require('./Components/Images/history.png') : require('./Components/Images/history-2.png');
    let title = this.props.selected ? this.props.iconLabel : '';
    if (Platform.OS === 'ios') {

      return (
        <View style={{ flex: 1, paddingTop: '1%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={source} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_HEIGHT * 0.038 }} />
          <Text style={{ color: '#003366', fontSize: 10, fontWeight: 'bold' }}>{title}</Text>

        </View>

      );
    }
    return (
      <View style={{ flex: 1, paddingTop: '1%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={source} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_HEIGHT * 0.038 }} />
        <Text style={{ color: '#003366', fontSize: 10, fontWeight: 'bold' }}>{title}</Text>

      </View>
    );
  }
}

class TabIcon2 extends Component {
  render() {
    let source = this.props.selected ? require('./Components/Images/qr-code.png') : require('./Components/Images/qr-code-2.png');
    let title = this.props.selected ? this.props.iconLabel : ''
    if (Platform.OS === 'ios') {
      return (
        <View style={{flex: 1,paddingTop: '1%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
         <TouchableOpacity onPress={()=> Actions.popTo('tab1')}>
          <Image source={source} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_HEIGHT * 0.038 }} />
          <Text style={{ color: '#003366', fontSize: 10, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ paddingTop: '1%', flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={source} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_HEIGHT * 0.038 }} />
        <Text style={{ color: '#003366', fontSize: 10, fontWeight: 'bold' }}>{title}</Text>

      </View>
    )

  }
}

class TabIcon3 extends Component {
  render() {
    let source = this.props.selected ? require('./Components/Images/settings.png') : require('./Components/Images/settingsGrey.png');
    let title = this.props.selected ? this.props.iconLabel : '';
    if (Platform.OS === 'ios') {

      return (
        <View style={{ flex: 1,paddingTop: '1%',  flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={source} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_HEIGHT * 0.038 }} />
          <Text style={{ color: '#003366', fontSize: 10, fontWeight: 'bold' }}>{title}</Text>

        </View>

      );
    }
    return (
      <View style={{ flex: 1, paddingTop: '1%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <Image source={source} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_HEIGHT * 0.038 }} />
        <Text style={{ color: '#003366', fontSize: 10, fontWeight: 'bold' }}>{title}</Text>

      </View>
    );
  }
}
class RouterComponent extends Component {
  render() {
    return (
      <Router >
        <Scene key="root"
          navigationBarStyle={{ backgroundColor: '#0091EA' }}
          titleStyle={{ color: "#FFF" }}>
          <Scene key="login" direction="horizontal" component={Login} title="Login" hideNavBar />

          <Scene
            key="Tab"
            hideNavBar
            tabStyle={styles.tab1style}
            tabBarPosition={'bottom'}
            tabs
            showLabel={false}
            tabBarStyle={styles.tabBarStyle}
            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
          >

            <Scene iconName='user_profile' icon={TabIcon1} iconLabel="History" key='tab2' component={UnderDevelopment} hideNavBar />
            <Tabs iconName='home' onPress={()=> Actions.popTo('tab1')} icon={TabIcon2} iconLabel="Scan" key='tab1' initial component={ScanScreen} hideNavBar />
            <Scene iconName='home' icon={TabIcon3} iconLabel="You" key='tab3' component={ProfilePage} hideNavBar />

          </Scene>

          
          <Scene clone hideTabBar={true} tabs={false} key="confirmationpage" direction="horizontal" component={ConfirmationPage} hideNavBar />
          <Scene clone hideTabBar={true} tabs={false} key="detailingpage" direction="horizontal" component={DetailingPage} hideNavBar />
          <Scene key="fingerprintscanner" direction="horizontal" component={Application} />
          <Scene key="padlisting" direction="horizontal" component={PadListing} hideNavBar />
          <Scene key="forgotpasswordpage" direction="horizontal" component={ForgotPassword} hideNavBar />
          <Scene key="validationunsuccessful" direction="horizontal" component={ValidationUnsuccessful} hideNavBar />





        </Scene>
      </Router>
    );
  }
}
export default RouterComponent
