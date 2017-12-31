import React from 'react';
import { FlatList, Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HideCamera, PadListings } from '../../../Actions/QRCodeActions/PadSuggestion';
import { Actions } from 'react-native-router-flux';
console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');
const data = {
    CompanyName: 'Apple Inc.',
    pads: [
        {
            'id': 0,
            'padname': 'Dream'
        },
        {
            'id': 1,

            'padname': 'live'
        }, {
            'padname': 'Cherish'
        },
        {
            'id': 2,

            'padname': 'Today'
        }, {
            'id': 3,

            'padname': 'Dream'
        },
        {
            'id': 4,

            'padname': 'live'
        }, {
            'id': 5,

            'padname': 'Cherish'
        },
        {
            'id': 6,

            'padname': 'Today'
        },

    ]
}
class PadListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: data,
            data: ''
        };

    }
    _keyExtractor = (item, index) => item._id;


componentWillReceiveProps(nextProps){
    if(nextProps.QRCodeReducer){
        console.log('Padlisting',nextProps.QRCodeReducer)
        this.setState({data: nextProps.QRCodeReducer.padListing})
    }
}

    render() {
        console.log('this.state.data',this.state.data)
        return (
            <View style={{ flex: 1, backgroundColor: '#fafcff', paddingHorizontal: 10 }}>
                <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.5 }}>
                    <TouchableOpacity onPress={()=> Actions.pop()}>
                        <Image source={require('../../Images/left-arrow.png')} style={{ height: WINDOW_HEIGHT * 0.04, width: WINDOW_HEIGHT * 0.04 }} />
                    </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                        <Image source={require('../../Images/search.png')} style={{ height: WINDOW_HEIGHT * 0.04, width: WINDOW_HEIGHT * 0.04 }} />
                    </View>
                </View>
                <View style={{ flex: 0.08, paddingLeft: '5%' }}>
                    <Text style={{ color: 'black',fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.045, fontWeight: '500' }}>{this.state.details.CompanyName}</Text>
                </View>
                <View style={{ flex: 0.82,paddingHorizontal: '4%' }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data.data}
                        keyExtractor={this._keyExtractor}
                        numColumns={2}
                        renderItem={({ item, index }) =>

                            <View style={{ flex: 1, padding: 5 }}>
                                <TouchableOpacity  style={{ backgroundColor: 'white', height: WINDOW_HEIGHT * 0.13, width: WINDOW_HEIGHT * 0.22, borderColor: '#f7f7f7', borderWidth: 2, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#767676' ,fontFamily: 'gotham'}}>Pad Name</Text>
                                    <Text style={{ color: '#003366',fontFamily: 'gotham', fontSize: WINDOW_HEIGHT * 0.025,fontWeight: '500' }}>{item.pad_name}</Text>
                                </TouchableOpacity>
                            </View>



                        }
                    />

                </View>



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
    return bindActionCreators({ HideCamera, PadListings }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(PadListing);

