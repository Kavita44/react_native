import React from 'react';
import { Switch, Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput, Platform, AsyncStorage, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  fingerprintExists, loggingOut, updateProfile ,ViewProfile, Pushnotification } from '../../../Actions/LoginActions/Loginaction';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import DropdownAlert from 'react-native-dropdownalert';
import FingerprintPopup from '../FingerPrint/fingerprint';
import styles from '../FingerPrint/Application.container.styles';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Fingerenabled: false,
            Pushenabled: false,
            phoneNo: '',
            sensorExists: true,
            showView: false,
            HideALert: false,
            fingerPrintStatus: '',
            name: '',
            edit: false
        };

    }

    componentWillMount() {
        this.logincheck();

    }


    componentDidMount() {
        AsyncStorage.getItem('FingerPrinting').then((FingerPrintEnabled) => {
            if (FingerPrintEnabled === 'FINGERPRINT_IS_ENABLED') {
                // console.log('FingerPrintEnabled', FingerPrintEnabled)
                this.setState({ Fingerenabled: true })
            }
        });

        FingerprintScanner
            .isSensorAvailable()
            .catch(error => {
                this.setState({ sensorExists: false }),
                    this.props.fingerprintExists(this.state.sensorExists);
            });
    }


    logincheck = () => {
        AsyncStorage.getItem('loginResponse').then((token_chck) => {
            if (token_chck) {
                let token = JSON.parse(token_chck)
                // console.log('tokennnnn on profilepage', token)
                this.setState({
                               email: token.data.email,
                               _id: token.data._id
                            })
            }
            this.ViewProfile()
        });
    }

    ViewProfile = () => {
        const data = {
            "userId" : this.state._id 
        }

        this.props.ViewProfile(data)
    }

    componentWillReceiveProps(nextProps){
        // console.log("chala recieve props")
        if(nextProps.Loginreducer.ViewProfile !== this.props.Loginreducer.ViewProfile){
            console.log('ViewProfile data',nextProps.Loginreducer.ViewProfile)
            this.setState({Profile : nextProps.Loginreducer.ViewProfile,
                        phoneNo: nextProps.Loginreducer.ViewProfile.data.phone_no,
                        name: nextProps.Loginreducer.ViewProfile.data.full_name,
                        Pushenabled: nextProps.Loginreducer.ViewProfile.data.push_noti_flag})                            

                    }
                                 
    

        if(nextProps.Loginreducer.uploadSuccess){
        // console.log('upload success')
        this.dropdown.alertWithType('warn', 'Success', 'Successfuly uploaded your profile');
        }

        if(nextProps.Loginreducer.uploadNotSuccess){
        // console.log('upload not successful')
        this.dropdown.alertWithType('error', 'Sorry', 'Profile could not be updated, please try again in sometime!');    
    }
    
    }
    

    hidealert = () => {
        if (this.state.HideALert)
            this.dropdown.alertWithType('warn', 'Success', 'Sucess');

    }

    ScanFinger = () => {
        const error = 'error'
        this.dropdown.alertWithType('info', 'warning', 'Please scan your finger via device scanner');
        FingerprintScanner
            .authenticate({ onAttempt: this.handleAuthenticationAttempted })
            .then(() => {

                if (this.state.Fingerenabled) {
                    this.setState({ Fingerenabled: false })
                    this.hidealert()
                }

                else {
                    this.setState({ HideALert: true })
                    this.hidealert()
                    this.setState({ Fingerenabled: true })
                    this.props.fingerprintExists(this.state.Fingerenabled)

                }
                const Fingerprint = this.state.Fingerenabled ? 'FINGERPRINT_IS_ENABLED' : 'FINGERPRINT_IS_DISABLED'
                AsyncStorage.setItem('FingerPrinting', Fingerprint);
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

    editProfilePic = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                this.setState({
                    avatarSource: response.uri, base64string: response.data
                });
            }
        });
    }

    uploadDetails = () => {
        if(!this.state.edit){
            // console.log("this.state.edit ho gayi false image set karne ke baad ab hogi api hit ", this.state.edit)
        let image = 'data:image/jpeg;base64,'+ this.state.base64string;
        
            const data ={        
                "email" : this.state.email,
                "full_name" : this.state.name,
                "phone_no" : this.state.phoneNo,
                "imgSrc" : image                    
        }
        // console.log('data for uploading profile',data)
            this.props.updateProfile(data)
        }
    }

    PushnotificationStatus = () => {
        const data = {
            "userId" : this.state._id,
            "push_noti_flag" : this.state.Pushenabled.toString()
            
        }
        this.props.Pushnotification(data)
    }

    Logout = () => {
        const token_id = {
            "_id": this.state._id
        }
        this.props.loggingOut(token_id)
        AsyncStorage.clear()
        Actions.popTo('login')
    }

    componentWillUnmount() {
        FingerprintScanner.release();
    }


    render() {
console.log("this.state.profie", this.state.Profile  + 'asdgahsgdahsdgahsdgahsgsagajggsd'+ this.state.Pushenabled)
if(this.state.Profile){
    let Profiling = this.state.Profile
        return (
            <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            <View style={{ flex: 1, backgroundColor: '#fafcff', paddingTop: Platform.OS === 'ios' ? '6%' : 0, paddingHorizontal: '10%', paddingBottom: '10%' }}>
                <View style={{ flex: 0.12, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: WINDOW_HEIGHT * 0.045, fontWeight: '500', fontFamily: 'gotham' }}>Profile</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => { this.setState({ edit: !this.state.edit }),setTimeout(()=>{this.uploadDetails()},1000 )}}>
                            <Image source={require('../../Images/edit.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        this.state.avatarSource ?
                            <Image source={{ uri: this.state.avatarSource }} style={{ height: WINDOW_HEIGHT * 0.13, width: WINDOW_HEIGHT * 0.13, borderRadius: WINDOW_HEIGHT * 0.065 }} />
                            :
                            <Image style={{ height: WINDOW_HEIGHT * 0.13, width: WINDOW_HEIGHT * 0.13, borderRadius: WINDOW_HEIGHT * 0.065 }} source={{uri: 'http://52.34.207.5:3034/' + Profiling.data.company_logo  }} />
                    }
                    {
                        !this.state.edit ?
                            <Text style={{ color: '#003366', fontSize: WINDOW_HEIGHT * 0.04, fontWeight: '500', fontFamily: 'gotham' }}>{this.state.name}</Text>
                            :
                            <TextInput
                                style={{ fontWeight: '400', height: 45, width: WINDOW_WIDTH*0.4,color: '#003366', fontSize: WINDOW_HEIGHT * 0.03, fontFamily: 'gotham' }}
                                onChangeText={(name) => this.setState({ name })}
                                underlineColorAndroid='transparent'
                                placeholder={this.state.name}
                            />
                    }
                    {this.state.edit ?
                        <View style={{ position: 'absolute', top: WINDOW_HEIGHT * 0.08, left: WINDOW_WIDTH * 0.44 }}>
                            <TouchableHighlight onPress={() => this.editProfilePic()}>
                                <Image source={require('../../Images/edit.png')} />
                            </TouchableHighlight>
                        </View> : null}
                </View>

                <View style={{ flex: 0.48 }}>
                    <View style={{ flex: 0.33, borderBottomColor: '#767676', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.85, justifyContent: 'center', paddingTop: '8%' }}>
                            <Text style={{ color: '#767676', fontSize: WINDOW_HEIGHT * 0.023, fontFamily: 'gotham' }}>Phone No.</Text>
                            <TextInput
                                style={{ fontWeight: '400', height: 45, color: '#003366', fontSize: WINDOW_HEIGHT * 0.03, fontFamily: 'gotham' }}
                                onChangeText={(phoneNo) => this.setState({ phoneNo })}
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                editable={this.state.edit ? true : false}
                                value={this.state.phoneNo}
                            />
                        </View>
                        <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../Images/arrow.png')} />
                        </View>
                    </View>
                    <View style={{ flex: 0.33, borderBottomColor: '#767676', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7, justifyContent: 'center' }}>
                            <Text style={{ color: '#003366', fontSize: WINDOW_HEIGHT * 0.03, fontFamily: 'gotham' }}>Push Notification</Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <Switch
                                onValueChange={() => { this.setState({ Pushenabled: !this.state.Pushenabled }) ,setTimeout(() => {this.PushnotificationStatus()} , 500)}}
                                onTintColor='#55cc7b'
                                value={this.state.Pushenabled ? true : false}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.34, borderBottomColor: '#767676', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7, justifyContent: 'center' }}>
                            <Text style={{ color: '#003366', fontSize: WINDOW_HEIGHT * 0.03, fontFamily: 'gotham' }}>Fingerprint Login</Text>
                        </View>

                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <Switch
                                onValueChange={() => {
                                    this.state.sensorExists ? this.ScanFinger() : this.dropdown.alertWithType('error', 'Sorry, your device doesnot supports fingerprint sensing', 'Missing finger print sensor');
                                }}
                                onTintColor='#55cc7b'
                                value={this.state.sensorExists && this.state.Fingerenabled ? true : false}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { this.Logout() }} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
                        <Image source={require('../../Images/logout_btn.png')} />
                    </TouchableOpacity>
                </View>

                <DropdownAlert
                    ref={ref => this.dropdown = ref}
                    titleNumOfLines={3}
                    warnColor='#32A54A'
                />
            </View>
            </KeyboardAwareScrollView>
        )
    }
    else {
        return(
            <View style={{alignItems: 'center',justifyContent: 'center',flex: 1}}>
            <ActivityIndicator />
                </View>
        )
    }
    }
}
const mapStateToProps = state => {
    return {
        Loginreducer: state.Loginreducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({  fingerprintExists, loggingOut, updateProfile , ViewProfile, Pushnotification}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

