import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { Container, Root, Text } from 'native-base'
import { BarCodeScanner, Permissions } from 'expo'
import ViewFinder from 'react-native-view-finder'
import firebaseService from '../service/firebase'
import moment from 'moment'

import Result from './result'

const FIREBASE = firebaseService.database()

export default class QRScanner extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      userId: firebaseService.auth().currentUser.uid,
      hasCameraPermssion: null,
      isBack: true,
      isTorchOn: false,
      data: '',
      type: '',
      modalVisible: false
    }
  }

  componentDidMount() {
    this._askCameraPermission()
  }

  _askCameraPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermssion: status === 'granted' })
  }
  
  _handleDone = () => {
    this.setState({ modalVisible: false })
  }

  _handleBarCodeRead = ({type, data}) => {
    const { modalVisible } = this.state
    
    if(modalVisible) {
      return
    }    
    
    FIREBASE.ref('appointments').push(
      {
        mentorId: this.state.data,
        userId: this.state.userId,
        startTime: moment().format("YYYY-MM-DD HH:mm"),
        endTime: '',
        status: 'ongoing'
      }, (error) => {
        if(error) alert(error.message)
      }
    ).then(() => {
      this.setState({ type, data, modalVisible: true })
    })
  }

  _handleReverseCamera = () => {
    this.setState({ isBack: !this.state.isBack })
  }

  _handleTorch = () => {
    this.setState({ isTorchOn: !this.state.isTorchOn })
  }

  render() {
    const { 
      hasCameraPermssion, isBack, isTorchOn, data, type, modalVisible
    } = this.state

    return(
      <Root>
        <Container>
          <Result 
            show={modalVisible}
            onDone={this._handleDone}
            data={data}
            type={type}
            />
          <BarCodeScanner
            type={isBack ? 'back' : 'front'}
            torchMode={isTorchOn ? 'on' : 'off'}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <ViewFinder />
          <TouchableOpacity onPress={this._handleReverseCamera} style={[style.btn, {right: 20}]}>
            <Ionicons 
              name="md-reverse-camera"
              size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleTorch} style={[style.btn, {left: 20}]}>
            <MaterialIcons 
              name={isTorchOn ? 'flash-on' : 'flash-off'}
              size={25} color="#000" />
          </TouchableOpacity>
        </Container>
      </Root>
    )
  }
}

const style = StyleSheet.create({
  btn: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    bottom: 20
  }
})