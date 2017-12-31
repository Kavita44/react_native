import React from 'react';
import { Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native';

import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';


console.disableYellowBox = true;
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

export default class UnderDevelopment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };

    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>UNDER DEVELOPMENT</Text>
            </View>

        )
    }
}
