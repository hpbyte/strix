import React, { Component } from 'react';
import { Modal, TextInput, Platform } from 'react-native';
import { Text, View } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { Grid, Col, Row } from 'react-native-easy-grid'
import Style from '../style'

export default class Result extends Component {
  constructor(props) {
    super(props)

    this.state = { txt: '' }
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
              onPress={onDone} 
            />
            <View style={Style.flexCenter}>
              <FontAwesome name="check-circle" size={70} color="green" />
              <Text style={{ fontSize: 45, textAlign: 'center' }}>Started!</Text>
              <TextInput style={{
                  marginTop: 20,
                  backgroundColor: '#eceff1',
                  borderRadius: 50,
                  paddingLeft: 25,
                  padding: Platform.OS === 'ios' ? 15 : 10,
                  fontSize: 16,
                  width: 200
                }} value={this.state.txt} onChangeText={txt => this.setState({txt})} 
              />
            </View>
          </Col>
        </Grid>
      </Modal>
    )
  }
}