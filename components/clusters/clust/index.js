import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import style from './style';

export default class Clust extends Component {    
    render() {
        return(
            <Grid>
                <Col style={style.col1} size={75}>
                    <Text>Column 1</Text>
                </Col>
                <Col style={style.col2} size={25}>
                    <Text>Column 2</Text>
                </Col>
            </Grid>
        );
    }
}

