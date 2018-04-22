import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

export default class Loading extends Component {
    render() {
        return(
            <View style={style.loader}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});