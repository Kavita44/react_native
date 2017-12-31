import React from 'react';
import { Alert,TextInput, Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import { Loginaction } from '../../../Actions/LoginActions/Loginaction';
import { Actions } from 'react-native-router-flux';
import SignupCard from './SignupCard'
import LoginCard from './LoginCard'

console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginComponent: true,
            SignupComponent: false,
            username: ''

        };

    }
    componentWillMount(){
        if(this.props.username){
            this.setState({username: this.props.username.email})
        }
    }
 
    render() {
        // if (this.props.Loginreducer.loginwaladata)
        //     alert(this.props.Loginreducer.loginwaladata)

const data = 'yippiie'
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: '#fafcff' }}>
                <View style={{ flex: 0.1, justifyContent: 'flex-end',paddingLeft: 15 }}>
                    
                    <TouchableOpacity onPress={()=> Actions.pop()}>
                        <Image source={require('../../Images/left-arrow.png')} style={{ height: WINDOW_HEIGHT * 0.04, width: WINDOW_HEIGHT * 0.04 }} />
                    </TouchableOpacity>
                    
                    
                </View>
                    <View style={{ flex: 0.25, padding: WINDOW_HEIGHT * 0.04, paddingTop: WINDOW_HEIGHT * 0.08 }}>
                        <Image source={require('../../Images/logo.png')} />
                        <Text style={{ color: '#032866', fontSize: WINDOW_HEIGHT * 0.04, fontWeight: 'bold' }}>Welcome!</Text>
                    </View>
                    <View style={{ flex: 0.65, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 0.2 }}>
                            <Text style={{ color: '#032866', fontSize: WINDOW_HEIGHT * 0.04, fontWeight: 'bold' }}>Reset Your Password!</Text>
                        </View>
                        <View style={{ flex: 0.8, paddingHorizontal: 10, backgroundColor: '#fafcff' }}>
                            <View style={{ backgroundColor: 'white', justifyContent: 'center', flex: 0.5, borderRadius: 10, borderColor: '#f5f5ff', borderWidth: 10 }}>
                                <TextInput
                            style={{ fontWeight: '400', height: 45, borderBottomColor: '#767676', borderBottomWidth: 0.5, color: '#003366', fontSize: WINDOW_HEIGHT * 0.03,marginHorizontal: 10 }}
                            onChangeText={(text) => this.setState({ username: text })}
                                    value={this.state.username}
                                    editable={false}
                                    keyboardType='email-address'
                                    placeholderTextColor='#767676'
                                    underlineColorAndroid='transparent'

                                />
                                <TextInput
                                    style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_WIDTH * 0.92, paddingVertical: 5, paddingLeft: 10 }}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholder='Password'
                                    placeholderTextColor='#767676'
                                    underlineColorAndroid='transparent'

                                />
                                <TextInput
                                    style={{ height: WINDOW_HEIGHT * 0.08, width: WINDOW_WIDTH * 0.92, paddingVertical: 5, paddingLeft: 10 }}
                                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                                    placeholder='Re-enter Password'
                                    placeholderTextColor='#767676'
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'


                                />

                            </View>
                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={()=> Alert.alert('Save Pressed')} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
                                    <Image source={require('../../Images/save_btn.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

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
    return bindActionCreators({ Loginaction }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

