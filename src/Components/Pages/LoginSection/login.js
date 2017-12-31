import React from 'react';
import {Geolocation,TextInput ,Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, AsyncStorage,PermissionsAndroid} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import { Loginaction, forgotpassword } from '../../../Actions/LoginActions/Loginaction';
import { Actions } from 'react-native-router-flux';
import SignupCard from './SignupCard'
import LoginCard from './LoginCard'
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from '../FingerPrint/fingerprint';
import styles from '../FingerPrint/Application.container.styles';
import DropdownAlert from 'react-native-dropdownalert';


console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginComponent: true,
            SignupComponent: false,
            sensorExists: true,
            popupShowed: false,
            password: '',
            username: '',

        };

    }

    

    ScanFinger = () => {
        const error = 'error'
        this.dropdown.alertWithType('info', 'warning', 'Please scan your finger via device scanner');
        FingerprintScanner
            .authenticate({ onAttempt: this.handleAuthenticationAttempted })
            .then(() => {
                Actions.Tab();                
            })
            .catch((error) => {
                if (error) {
                    console.log("can't match")
                }
            });
    }
    handleAuthenticationAttempted = (error) => {
        this.dropdown.alertWithType('error', 'Access denied', 'Sorry your fingerprint doesnot match. ');
    };
    
    // handleFingerprintShowed = () => {
    //     this.setState({ popupShowed: true });
    //   };
    
    //   handleFingerprintDismissed = () => {
    //     this.setState({ popupShowed: false });
    //   };

      login = () => {

          let data={
            "email": this.state.username,
            "password": this.state.password,
            "deviceId": this.state.Device_Token  
        }
        if (!this.state.username)
        this.dropdown.alertWithType('info','Please enter the username' , 'Missing username');        
        else if (!this.state.password)
        this.dropdown.alertWithType('info','Please enter the Password' , 'Password cannot be null');        
        else{
        this.props.Loginaction(data)
        }
      }

      Forgotpassword = () => {
        let data={
            "email": this.state.username,
        }
        if (!this.state.username){
            this.dropdown.alertWithType('info','Please enter the username' , 'Missing username');        
        }
        else{
           this.props.forgotpassword(data)
        }

      }


    logincheck = () => {
        AsyncStorage.getItem('loginResponse').then((token_chck) => {
            if (token_chck) {
                let token = JSON.parse(token_chck)
                // console.log('tokennnnn',token)
                if (token.data.token) {
                    Actions.Tab()
                }

            }
        });
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('position',position)
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => { this.setState({ error: error.message })},
            { enableHighAccuracy: true },
          ); 
             
         
        AsyncStorage.getItem('FingerPrinting').then((FingerPrintEnabled) => {
            if (FingerPrintEnabled) {
                // console.log('FingerPrintEnabled',FingerPrintEnabled)
                // console.log('tokennnnn',token.data.token)
                this.setState({fingerPrintStatus: FingerPrintEnabled})

            }
        });
        AsyncStorage.getItem('Device_Token').then((Device_Token) => {
            if (Device_Token) {
                // console.log('Device_Token on login page',Device_Token)
                // console.log('tokennnnn',token.data.token)
                this.setState({Device_Token: Device_Token})

            }
        });

        FingerprintScanner
            .isSensorAvailable()
            .catch(error => {
                this.logincheck();
                this.setState({ sensorExists: false })
        });
        console.log("done")
    }


    // clicking = (data) => {
    //     const info = 'info'
    //     this.dropdown.alertWithType('info', info, data);
    // }

    render() {
        // const { errorMessage, popupShowed } = this.state; 
                                
        // console.log("this.state.fingerprintStatus",this.state.fingerPrintStatus+ "sensorExists?" +this.state.sensorExists + 'Device_token'+this.state.Device_Token)
    console.log("Complete log of user", this.state.latitude + 'along with its longitude' + this.state.longitude + this.state.error)        
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: '#fafcff' }}>
                    <View style={{ flex: 0.25, padding: WINDOW_HEIGHT * 0.04, paddingTop: WINDOW_HEIGHT * 0.08 }}>
                        <Image source={require('../../Images/logo.png')} />
                        <Text style={{ color: '#032866', fontSize: WINDOW_HEIGHT * 0.04, fontWeight: 'bold', fontFamily: 'gotham' }}>Welcome!</Text>
                    </View>
                    <View style={{ flex: 0.12, flexDirection: 'row' }}>
                        {/* {
                            this.state.SignupComponent ? */}
                                {/* <TouchableOpacity onPress={() => this.setState({ LoginComponent: true, SignupComponent: false })} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={{ fontWeight: '400', color: 'black', fontFamily: 'gotham' }}>LOGIN</Text>
                                </TouchableOpacity> */}
                                
                                <View style={{ flex: 0.5, alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'black', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15 }}>
                                        <Text style={{ color: 'white', backgroundColor: 'transparent', fontFamily: 'gotham' }}>LOGIN</Text>
                                    </View>
                                    <View>
                                        <Image style={{ marginTop: '1%' }} source={require('../../Images/tab.png')} />
                                    </View>

                                </View>
                                {/* }
                        {
                            this.state.LoginComponent ? */}
                                {/* <TouchableOpacity onPress={() => this.setState({ SignupComponent: true, LoginComponent: false })} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={{ fontWeight: '400', color: 'black', fontFamily: 'gotham', fontFamily: 'gotham' }}>SIGNUP</Text>
                                </TouchableOpacity>
                                :
                                <View style={{ flex: 0.5, alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'black', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15 }}>
                                        <Text style={{ color: 'white', backgroundColor: 'transparent', fontFamily: 'gotham' }}>SIGNUP</Text>
                                    </View>
                                    <View>
                                        <Image style={{ marginTop: '1%' }} source={require('../../Images/tab.png')} />
                                    </View>
                                </View>
                        } */}

                    </View>
                    <View style={{ flex: 0.63, paddingTop: '2%' }}>
                    <View style={{ flex: 1, backgroundColor: '#fafcff', paddingHorizontal: 10 }}>


                <View style={{ backgroundColor: 'white', justifyContent: 'center', flex: 0.3, borderRadius: 10, borderColor: '#f5f5ff', borderWidth: 10}}>
                    <TextInput
                        style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_WIDTH * 0.92, paddingVertical: 5, paddingLeft: 10 }}
                        onChangeText={(text) => this.setState({ username: text })}
                        placeholder='User name'
                        keyboardType='email-address'
                        placeholderTextColor='#767676'
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'

                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.8 }}>
                            <TextInput
                                style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_WIDTH * 0.7, paddingVertical: 5, paddingLeft: 10 }}
                                onChangeText={(text) => this.setState({ password: text })}
                                placeholder='Password'
                                placeholderTextColor='#767676'
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                                

                            />
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={()=> this.Forgotpassword()}>
                            <Text style={{ color: 'red',fontFamily: 'gotham' }}>Forgot?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.25, alignItems: 'center', paddingTop: '5%' }}>
                    <TouchableOpacity onPress={() => {this.login()}} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
                        <Image source={require('../../Images/login.png')} />
                    </TouchableOpacity>

                </View>
                 {
                    this.state.sensorExists && this.state.fingerPrintStatus === 'FINGERPRINT_IS_ENABLED' ?
                        <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../Images/fingerprint.png')} />
                        </View>
                          : null}
                {
                    this.state.sensorExists && this.state.fingerPrintStatus === 'FINGERPRINT_IS_ENABLED' ? 
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=> this.ScanFinger()} style={{ backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.1, width: WINDOW_HEIGHT * 0.1, alignItems: 'center', justifyContent: 'center', borderRadius: WINDOW_HEIGHT * 0.05 }}>
                                <Image source={require('../../Images/finger_print.png')} />
                            </TouchableOpacity>
                        </View> 
                         : null
                }
                {/* {popupShowed && (
          <FingerprintPopup
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
            />
        )} */}
        
            </View>
                    </View>



                    <DropdownAlert
                        ref={ref => this.dropdown = ref}
                        closeInterval={2000}
                    />
                </View>

            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = state => {
    return {
        Loginreducer: state.Loginreducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ Loginaction, forgotpassword }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

