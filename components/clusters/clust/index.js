import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Text,
    Body,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Row } from "react-native-easy-grid";
// import style from './style';

export default class Clust extends Component {    
    render() {
        return(
            <Row style={{ height: 200, backgroundColor: this.props.bgcolor, 
                justifyContent: 'center', alignItems: 'center', margin: 5,
                borderRadius: 15 }}>
                <View>
                    <Ionicons name='logo-nodejs' size={55} color="#fff" />
                    <Text style={style.txt}>Row</Text>
                </View>
            </Row>
        );
    }
}

const style = StyleSheet.create({
    txt: {
        color: '#fff',
        fontSize: 25
    }
});