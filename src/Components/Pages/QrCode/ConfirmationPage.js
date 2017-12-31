import React from 'react';
import { ScrollView,BackHandler, Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from '../FingerPrint/fingerprint';
import styles from '../FingerPrint/Application.container.styles';
import { HideCamera, PadListings } from '../../../Actions/QRCodeActions/PadSuggestion';
import { Actions } from 'react-native-router-flux';
console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');


class ConfirmationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComponent: 'ConfirmationPage'

        };

    }
    componentWillMount() {
        const data = "dsd"
        
        this.props.HideCamera(data)
        console.log("chala")
    }
    
    // disablecamera = () => {
        //     if (this.state.currentComponent === 'ConfirmationPage'){
                
        //     const data = "false";
            
        //     this.props.HideCamera(data)
        //     console.log("chala ye waala")
        //     Actions.Tab()
        //     }
        // }
        // componentWillMount(){
        //     BackHandler.addEventListener('hardwareBackPress', this.disablecamera);
            
        // }
    
        // componentWillUnmount() {
        // 	BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // }


    render() {
        if(this.props.QRCodeReducer.qrdata){
        const details = this.props.QRCodeReducer.qrdata.data
        // console.log("details",details)
                return (
                    <View style={{ flex: 1, backgroundColor: '#fafcff' }}>
                        <View style={{ flex: 0.15, backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={() => { Actions.pop()}} style={{ padding: WINDOW_HEIGHT * 0.02 }}>
                                <Image source={require('../../Images/left-arrow.png')} style={{ height: WINDOW_HEIGHT * 0.04, width: WINDOW_HEIGHT * 0.04 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 0.85 }}>
                            <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#003366', fontWeight: '500', fontFamily: 'gotham' }}>Validation successful</Text>
                            </View>
                            <View style={{ flex: 0.45, paddingLeft: '8%',paddingVertical: '5%' }}>
                                <View style={{ flex: 0.3, flexDirection: 'row', }}>
                                    <Image source={{ uri: 'http://52.34.207.5:3034/' + details[0].companyData.company_logo }} style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_HEIGHT * 0.08, borderRadius: WINDOW_HEIGHT * 0.04 }} />
                                    <Text style={{ fontSize: WINDOW_HEIGHT * 0.04, fontFamily: 'gotham', color: 'black', fontWeight: '500', paddingLeft: '3%',alignSelf: 'center' ,alignItems: 'center',justifyContent: 'center'}}>{details[0].companyData.company_name}</Text>
                             </View>
                                <ScrollView style={{ flex: 0.7,height: WINDOW_HEIGHT*0.05 }}>
                                    <Text style={{ fontSize: WINDOW_HEIGHT * 0.025, fontFamily: 'gotham', color: '#767676' }}>{details[0].companyData.company_desc}</Text>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 0.4, paddingHorizontal: '8%' }}>
                                <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 0.48, backgroundColor: 'white', borderWidth: 1, borderColor: '#dadada', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#767676', fontWeight: '500', fontFamily: 'gotham' }}>Tank No.</Text>
                                        <Text style={{ color: '#003366', fontWeight: '500', fontSize: WINDOW_HEIGHT * 0.025 }}>{details[0].tank_no}</Text>

                                    </View>
                                    <View style={{ flex: 0.48, backgroundColor: 'white', borderWidth: 1, borderColor: '#dadada', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#767676', fontWeight: '500', fontFamily: 'gotham' }}>Pad Name</Text>
                                        <Text style={{ color: '#003366', fontFamily: 'gotham', fontWeight: '500', fontSize: WINDOW_HEIGHT * 0.025 }}>{details[0].padsData.pad_name}</Text>
                                    </View>

                                </View>
                                <View style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 0.48, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <TouchableOpacity onPress={() => { Actions.padlisting(), this.props.PadListings() }} style={{ backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../Images/cancel_btn.png')} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 0.48, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => { Actions.detailingpage() }} style={{ backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../Images/confirm.png')} />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </View>





                        </View>
                        <View style={{ position: 'absolute', top: WINDOW_HEIGHT * 0.1, left: WINDOW_WIDTH * 0.42, backgroundColor: 'white' }}>
                            <Image source={require('../../Images/success.png')} style={{ width: WINDOW_WIDTH * 0.12, height: WINDOW_WIDTH * 0.12 }} />
                        </View>
                    </View>





                )
            }
            else{
                return(<View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                    <ActivityIndicator/>
                    </View>)
            }
        }
    }

const mapStateToProps = state => {
    return {
        QRCodeReducer: state.QRCodeReducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ HideCamera, PadListings }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);

