// import React from 'react';
// import { Alert,Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
// import FingerprintPopup from '../FingerPrint/fingerprint';
// import styles from '../FingerPrint/Application.container.styles';
// import { Loginaction , forgotpassword } from '../../../Actions/LoginActions/Loginaction';
// import { Actions } from 'react-native-router-flux';
// console.disableYellowBox = true;
// const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

// class LoginCard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             sensorExists: true,
//             errorMessage: undefined,
//             popupShowed: false,
//             password: '',
//             username: '',
//         };

//     }

//     componentDidMount() {
//         AsyncStorage.getItem('FingerPrinting').then((FingerPrintEnabled) => {
//             if (FingerPrintEnabled) {
//                 console.log('FingerPrintEnabled',FingerPrintEnabled)
//                 // console.log('tokennnnn',token.data.token)
//                 this.setState({fingerPrintStatus: FingerPrintEnabled})

//             }
//         });       
//         FingerprintScanner
//             .isSensorAvailable()
//             .catch(error => {this.setState({ sensorExists: false })});
//     }
    
//     handleFingerprintShowed = () => {
//         this.setState({ popupShowed: true });
//       };
    
//       handleFingerprintDismissed = () => {
//         this.setState({ popupShowed: false });
//       };

//       login = () => {
//           let data={
//             "email": this.state.username,
//             "password": this.state.password   
//         }
//         if (!this.state.username)
//         this.props.onClick('Please fill in the username.');          
//         else if (!this.state.password)
//         this.props.onClick('Please enter the password.');          
//         else{
//         this.props.Loginaction(data)
//         }
//       }

//       Forgotpassword = () => {
//         let data={
//             "email": this.state.username,
//         }
//         if (!this.state.username){
//             this.props.onClick('Please fill in the username.');  
//           }
//         else{
//            this.props.forgotpassword(data)
//         }

//       }


//     render() {
//         const { errorMessage, popupShowed } = this.state;
        
//         // if (this.props.Loginreducer.sensorExists){
//         //     this.setState({fingerEnabled: true})
//         // }
//         return (
//             <View style={{ flex: 1, backgroundColor: '#fafcff', paddingHorizontal: 10 }}>


//                 <View style={{ backgroundColor: 'white', justifyContent: 'center', flex: 0.3, borderRadius: 10, borderColor: '#f5f5ff', borderWidth: 10}}>
//                     <TextInput
//                         style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_WIDTH * 0.92, paddingVertical: 5, paddingLeft: 10 }}
//                         onChangeText={(text) => this.setState({ username: text })}
//                         placeholder='User name'
//                         keyboardType='email-address'
//                         placeholderTextColor='#767676'
//                         underlineColorAndroid='transparent'
//                         autoCapitalize='none'

//                     />
//                     <View style={{ flexDirection: 'row' }}>
//                         <View style={{ flex: 0.8 }}>
//                             <TextInput
//                                 style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_WIDTH * 0.7, paddingVertical: 5, paddingLeft: 10 }}
//                                 onChangeText={(text) => this.setState({ password: text })}
//                                 placeholder='Password'
//                                 placeholderTextColor='#767676'
//                                 secureTextEntry={true}
//                                 underlineColorAndroid='transparent'
//                                 autoCapitalize='none'
                                

//                             />
//                         </View>
//                         <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
//                             <TouchableOpacity onPress={()=> this.Forgotpassword()}>
//                             <Text style={{ color: 'red',fontFamily: 'gotham' }}>Forgot?</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{ flex: 0.25, alignItems: 'center', paddingTop: '5%' }}>
//                     <TouchableOpacity onPress={() => {this.login()}} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
//                         <Image source={require('../../Images/login.png')} />
//                     </TouchableOpacity>

//                 </View>{
//                     this.state.sensorExists && this.state.fingerPrintStatus === 'FINGERPRINT_IS_ENABLED' ?
//                         <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
//                             <Image source={require('../../Images/fingerprint.png')} />
//                         </View> : null}
//                 {
//                     this.state.sensorExists && this.state.fingerPrintStatus === 'FINGERPRINT_IS_ENABLED' ?
//                     <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
//                             <TouchableOpacity onPress={this.handleFingerprintShowed} disabled={!!errorMessage} style={{ backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.1, width: WINDOW_HEIGHT * 0.1, alignItems: 'center', justifyContent: 'center', borderRadius: WINDOW_HEIGHT * 0.05 }}>
//                                 <Image source={require('../../Images/finger_print.png')} />
//                             </TouchableOpacity>
//                         </View> : null
//                 }
//                 {popupShowed && (
//           <FingerprintPopup
//             style={styles.popup}
//             handlePopupDismissed={this.handleFingerprintDismissed}
//             />
//         )}
        
//             </View>





//         )
//     }
// }
// const mapStateToProps = state => {
//     return {
//         Loginreducer: state.Loginreducer,
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({ Loginaction, forgotpassword }, dispatch);
// };
// export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);

