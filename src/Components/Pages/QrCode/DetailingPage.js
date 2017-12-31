import React from 'react';
import { FlatList, Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import { saveTranscations } from '../../../Actions/QRCodeActions/PadSuggestion';
import { Actions } from 'react-native-router-flux';
import DropdownAlert from 'react-native-dropdownalert';

console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');
const data = {
    tankNo: 'WR51048',
    padName: 'cherish',
    serialNo: '54879',
}
class DetailingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: data
        };

    }

saveTranscation = (details) =>{
    const TransactionDetails = {
        'tank_id' : details[0]._id,
        "invoice_no" : this.state.invoice,
        "volume" : this.state.waterVolume

    }
    if(!this.state.invoice ){
    this.dropdown.alertWithType('error', 'Missing Invoice Number', 'Please fill in the Invoice Number');
    }
    if(!this.state.waterVolume){
    this.dropdown.alertWithType('error', 'Water Volume not entered', 'Please fill in the Water Volume');   
    }
    else{ 
    this.props.saveTranscations(TransactionDetails)
    Actions.popTo('tab1')}
}

    render() {
        if (this.props.QRCodeReducer.qrdata) {
            const details = this.props.QRCodeReducer.qrdata.data
            return (

                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>

                    <View style={{ flex: 1, backgroundColor: '#fafcff' }}>
                        <View style={{ flex: 0.13, backgroundColor: 'white', justifyContent: 'flex-end', paddingLeft: '5%', paddingBottom: '2%' }}>

                            <Text style={{ color: 'black', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.045, fontWeight: '500' }}>Details</Text>
                        </View>
                        <View style={{ flex: 0.87, paddingHorizontal: '5%' }}>
                            <View style={{ flex: 0.3, backgroundColor: 'white', borderColor: '#f7f7f7', borderWidth: 2, borderRadius: 5 }}>
                                <View style={{ flex: 0.33, flexDirection: 'row', paddingHorizontal: '4%' }}>
                                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#767676', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.023 }}>Tank No.</Text>
                                    </View>

                                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#003366', fontFamily: 'gotham', fontWeight: '500', fontSize: WINDOW_HEIGHT * 0.03 }}>{details[0].tank_no}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.33, flexDirection: 'row', paddingHorizontal: '4%' }}>
                                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#767676', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.023 }}>Pad Name</Text>
                                    </View>

                                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#003366', fontFamily: 'gotham', fontWeight: '500', fontSize: WINDOW_HEIGHT * 0.03 }}>{details[0].padsData.pad_name}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.34, flexDirection: 'row', paddingHorizontal: '4%' }}>
                                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#767676', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.023 }}>Serial No.</Text>
                                    </View>

                                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#003366', fontFamily: 'gotham', fontWeight: '500', fontSize: WINDOW_HEIGHT * 0.03 }}>{details[0].serial_no}</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flex: 0.15, backgroundColor: 'white', borderColor: '#f7f7f7', borderWidth: 2, borderRadius: 5, marginTop: '3%', padding: '5%' }}>
                                <Text style={{ color: '#767676', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.023 }}>Invoice No.</Text>

                                <TextInput
                                    style={{ fontWeight: '400', fontFamily: 'gotham', height: 45, borderBottomColor: '#767676', borderBottomWidth: 0.5, color: '#003366', fontSize: WINDOW_HEIGHT * 0.03 }}
                                    onChangeText={(invoice) => this.setState({ invoice })}
                                    underlineColorAndroid='transparent'

                                />

                            </View>

                            <View style={{ flex: 0.15, backgroundColor: 'white', borderColor: '#f7f7f7', borderWidth: 2, borderRadius: 5, marginTop: '3%', padding: '5%' }}>
                                <Text style={{ color: '#767676', fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.023 }}>Water Volume</Text>
                                <TextInput
                                    style={{ fontWeight: '400', fontFamily: 'gotham', height: 45, borderBottomColor: '#767676', borderBottomWidth: 0.5, color: '#003366', fontSize: WINDOW_HEIGHT * 0.03 }}
                                    onChangeText={(waterVolume) => this.setState({ waterVolume })}
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                />
                            </View>
                            <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-between', paddingTop: '5%' }}>
                                <View style={{ flex: 0.48, alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => Actions.pop()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
                                        <Image source={require('../../Images/go_back_btn.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.48 }}>
                                    <TouchableOpacity onPress={() => { this.saveTranscation(details)}} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
                                        <Image source={require('../../Images/save_btn.png')} />
                                    </TouchableOpacity>
                                </View>
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
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        QRCodeReducer: state.QRCodeReducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ saveTranscations }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailingPage);

