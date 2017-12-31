import React from 'react';
import { Alert, Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { SignupAction } from '../../../Actions/RegisterActions/SignupAction';
import { Actions } from 'react-native-router-flux';
console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');



class SignupCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            name: '',
            password: '',
            phone: '',
            email: ''
        };

    }

    SelectprofilePic = () => {
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
            console.log('Response = ', response);

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

                console.log('response from picker', response)
                this.setState({
                    avatarSource: response.uri
                });
            }
        });
    }


    Signin = () => {
        let datas = {
            "full_name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "phone_no": this.state.phone
        }

        let minNumberofChars = 5;
        let maxNumberofChars = 16;
        let minNumberofphone = 10;
        let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let illegalExp = /^[a-zA-Z0-9- ]*$/;

        if (!this.state.name)
            Alert.alert("Please enter Name")
        else if (this.state.name.length >= maxNumberofChars)
            Alert.alert("Name must contain atmost 16 Letters")
        else if (/^[0-9]+$/i.test(this.state.name))
            Alert.alert("Name must be Text only")
        else if (!this.state.email)
            Alert.alert("Please fill Email")
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
            Alert.alert("Invalid Email")
        else if (!this.state.phone)
            Alert.alert("Please fill Phone No.")
        else if (!this.state.password)
            Alert.alert("Please fill Password")
        else if (this.state.password.length <= minNumberofChars)
            Alert.alert('Password must contain at least 5 Letters')
        else if (this.state.password.length >= maxNumberofChars)
            Alert.alert('Password must contain atmost 16 Letters')
        else {
            this.props.SignupAction(datas)
        }

    }

    render() {
        // if(this.props.SignupReducer.Signup)
        // {
        //     alert('Signup Button')
        // }

        const data = 'Signup'
        return (

            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>


                <View style={{ backgroundColor: 'white', justifyContent: 'center', flex: 0.6, borderRadius: 10, borderColor: '#f5f5ff', borderWidth: 10 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.SelectprofilePic()}>
                                {
                                    this.state.avatarSource ?
                                        <Image source={{ uri: this.state.avatarSource }} style={{ height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.11, borderRadius: WINDOW_HEIGHT * 0.055 }} />
                                        :
                                        <Image source={require('../../Images/img_upload.png')} />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 0.7 }}>
                            <TextInput
                                style={{ height: WINDOW_HEIGHT * 0.07, width: '100%', paddingVertical: 10, paddingLeft: 10 }}
                                onChangeText={(text) => this.setState({ name: text })}
                                placeholder='Full Name'
                                placeholderTextColor='#767676'
                                underlineColorAndroid='transparent'
                                

                            />
                            <TextInput
                                style={{ height: WINDOW_HEIGHT * 0.07, width: '100%', paddingVertical: 10, paddingLeft: 10 }}
                                onChangeText={(text) => this.setState({ email: text })}
                                placeholder='Email'
                                keyboardType='email-address'
                                placeholderTextColor='#767676'
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                                
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <TextInput
                            style={{ height: WINDOW_HEIGHT * 0.07, width: WINDOW_WIDTH * 0.92, paddingVertical: 10, paddingLeft: 10 }}
                            onChangeText={(text) => this.setState({ phone: text })}
                            placeholder='Phone No.'
                            keyboardType='numeric'
                            placeholderTextColor='#767676'
                            underlineColorAndroid='transparent'


                        />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.9 }}>
                                <TextInput
                                    style={{ height: WINDOW_HEIGHT * 0.07, width: WINDOW_WIDTH * 0.92, paddingTop: 10, paddingLeft: 10 }}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholder='Password'
                                    placeholderTextColor='#767676'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={this.state.showPassword ? true : false}



                                />
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showPassword: !this.state.showPassword })} style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    this.state.showPassword
                                        ?
                                        <Image source={require('../../Images/eye_on.png')} />
                                        :
                                        <Image source={require('../../Images/eye_off.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.4, alignItems: 'center', paddingTop: '5%' }}>
                    <TouchableOpacity onPress={() => { this.Signin() }} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5ff', height: WINDOW_HEIGHT * 0.11, width: WINDOW_HEIGHT * 0.175, borderRadius: WINDOW_HEIGHT * 0.06 }}>
                        <Image source={require('../../Images/signup.png')} />
                    </TouchableOpacity>

                </View>

            </View>





        )
    }
}
const mapStateToProps = state => {
    return {
        SignupReducer: state.SignupReducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ SignupAction }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupCard);

