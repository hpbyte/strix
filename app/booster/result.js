import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { Container, Content, Text, View } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { Grid, Col, Row } from 'react-native-easy-grid'
import firebaseService from '../service/firebase'
import moment from 'moment'
import Style from '../style'

export default class Result extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { show, onDone } = this.props

    return(
      <Modal
        animationType='slide'
        transparent={false}
        visible={show}
        onRequestClose={onDone} >
        <Grid>
          <Col>
            <FontAwesome
              style={{ alignSelf: 'center' }} 
              name="sort-down" size={45} color="#ccc" 
              onPress={onDone} />
            <View style={Style.flexCenter}>
              <Text style={{ fontSize: 45, textAlign: 'center' }}>Started!</Text>
            </View>
          </Col>
        </Grid>
      </Modal>
    )
  }
}