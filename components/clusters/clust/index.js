import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default class Clust extends Component {    
    render() {
        return(
            <Grid>
                <Col style={style.col1}></Col>
                <Col style={style.col2}></Col>
            </Grid>
        );
    }
}

const style = StyleSheet.create({
    col1: {
        backgroundColor: '#90caf9',
        borderRadius: 10
    },
    col2: {
        backgroundColor: '#fff9c4',
        borderRadius: 10
    }
});