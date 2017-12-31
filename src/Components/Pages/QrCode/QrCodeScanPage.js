import {
  View, PermissionsAndroid, Dimensions, Text, Platform, Image, Alert
} from 'react-native';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { QrcodeAction, HideCamera } from '../../../Actions/QRCodeActions/PadSuggestion';
import * as Animatable from 'react-native-animatable';

import Camera from 'react-native-camera';

console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');


class ScanScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraType: 'back',
      torch: false,
      hideCamera: false,
      animate: true
    };
  }

  componentWillMount() {
    const date = new Date();
    console.log("time ho rha hai ", date.getHours(), this.state.hideCamera)
    if (date.getHours() >= 18) {
      this.setState({ torch: true })
    }
    if (Platform.OS !== 'ios') {

      this.requestCameraPermission()
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps, "nextProps")
    if(nextProps.QRCodeReducer.hideCamera){
this.setState({hideCamera: false})
console.log("set to false",nextProps.QRCodeReducer)       
    }
}

  async requestCameraPermission() {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ cameraPermission: true })
      } else {
        Alert.alert('Please provide Permissions for further processes.')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  barcodeReceived = (e) => {
    console.log('event of barcode', e)
    if(e.data){
    const data = { '_id' : e.data }
    console.log('data of event barcodde',data)
    this.props.QrcodeAction(data);
    this.setState({hideCamera: true})   
  }
  else{
    this.props.QrcodeAction()  
    this.setState({hideCamera: true})   
    
  }
    this.setState({ torch: false })
    return true;
  }


  render() {
   
console.log('this.state.camera',this.state.hideCamera)
    // if(this.state.cameraPermission ||  Platform.os !=='ios'){
    // if(this.props.QRCodeReducer.qrdata){
    //   alert('done')
    // }
   
    return (
      <View style={{ flex: 1, paddingBottom: '10%' }}>
        <View style={{ flex: 0.15, backgroundColor: '#fafcff', justifyContent: 'flex-end', paddingLeft: WINDOW_HEIGHT * 0.04 }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.04, paddingBottom: '2%' }}>QR Code Scan</Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={{ flex: 1 }}
            torchMode={this.state.torch ? 'on' : 'off'}
            flashMode={'on'}
            onBarCodeRead={(e) => {this.state.hideCamera ? null : this.barcodeReceived(e)}}
            aspect={Camera.constants.Aspect.fill}>
            <Image source={require('../../Images/scan.png')} style={{ alignItems: 'center', justifyContent: 'center', width: WINDOW_WIDTH, height: '100%' }}>
              { this.state.animate ?
              <View>
              <Animatable.Image source={require('../../Images/line.png')} animation="slideInDown" iterationCount={99999999999999} direction="alternate" />
              <Animatable.Image source={require('../../Images/line.png')} animation="slideInUp" iterationCount={99999999999999} direction="alternate" />
                </View>
        : null  }
            </Image>
          </Camera>
        </View>
        <View style={{ backgroundColor: '#fafcff', flex: 0.15, alignItems: 'center', paddingTop: WINDOW_HEIGHT * 0.03 }}>
          <Text style={{ color: '#003366', fontWeight: '500', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.03 }}>Scan QR Code on Pad</Text>
        </View>
      </View>
    );
    // }
    //   else{
    // return(
    //   <View style={{ flex: 1 }}>
    //   <View style={{ flex: 0.15, backgroundColor: '#fafcff',justifyContent: 'flex-end' ,paddingLeft: WINDOW_HEIGHT*0.04}}>
    //   <Text style={{color: 'black',fontWeight: 'bold',fontSize: WINDOW_HEIGHT*0.04}}>QR Code Scan</Text>
    //   </View>
    //   <View style={{ flex: 0.7,justifyContent: 'center',alignItems: 'center' }}>
    //     <Text>You Need to Provide Camera, storage permissions first.</Text>
    //   </View>
    //   <View style={{ backgroundColor: '#fafcff',flex: 0.15,alignItems: 'center',paddingTop: WINDOW_HEIGHT*0.03 }}>
    //   <Text style={{color: '#003366',fontWeight: '500',fontSize: WINDOW_HEIGHT*0.03}}>Scan QR Code on Pad</Text>
    //   </View>
    // </View>
    // )
    if(this.state.animate)
    this.setState({animate: !this.state.animate})
  }
}
// }

const mapStateToProps = state => {
  return {
    QRCodeReducer: state.QRCodeReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ QrcodeAction ,HideCamera}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);

