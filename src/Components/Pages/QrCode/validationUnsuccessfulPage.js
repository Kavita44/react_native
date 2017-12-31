import React from 'react';
import { Alert,Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { QrcodeAction, HideCamera } from '../../../Actions/QRCodeActions/PadSuggestion';
import { Actions } from 'react-native-router-flux';
console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

class ValidationUnsuccessful extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };

    }
    componentWillMount() {
        const data = "false";
        
        this.props.HideCamera(data)
        console.log("chala")
    }
    
    


    render() {
        const { errorMessage, popupShowed } = this.state;
        
        // if (this.props.Loginreducer.loginwaladata)
        //     alert('received')
                    return (
            <View style={{ flex: 1, backgroundColor: '#fafcff',alignItems: 'center',justifyContent: 'center' }}>
            
            <Image source={require('../../Images/unsuccesful.png')}/>
            <Text style={{color: '#ff4858',fontFamily: 'gotham',fontSize: WINDOW_HEIGHT*0.02,paddingVertical: '2%',fontWeight: '500'}}>Validation unsuccessful</Text>
            <Text style={{color: '#767676',fontFamily: 'gotham',fontSize: WINDOW_HEIGHT*0.018,fontWeight: '500'}}>Please contact your administrator.</Text>
            <TouchableOpacity onPress={()=> Actions.pop()} style={{ marginTop: '10%',alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>

            <Image source={require('../../Images/scan_again_btn.png')}/>
            </TouchableOpacity>
            </View>

        )
    }
}
const mapStateToProps = state => {
    return {
        QRCodeReducer: state.QRCodeReducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ HideCamera }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ValidationUnsuccessful);

