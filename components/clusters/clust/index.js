import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Clust extends Component {    
    render() {
        return(
            <TouchableHighlight style={style.btn}>
                <View>
                    <Ionicons name='ios-home' size={30} />
                    <Text>Home</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const style = StyleSheet.create({
    btn: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2a4ff0',
        padding: 10,
        margin: 20
    }    
});