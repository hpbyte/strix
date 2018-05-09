import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ViewFinder from 'react-native-view-finder'
import { BarCodeScanner, Permissions } from 'expo'
import { Container, Text } from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

export default class QRScanner extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hasCameraPermssion: null,
      isBack: true,
      isTorchOn: false,
      data: '',
      type: ''
    }
  }

  componentDidMount() {
    this._askCameraPermission()
  }

  _askCameraPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermssion: status === 'granted' })
  }

  _handleBarCodeRead = (data) => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );
  }

  _handleReverseCamera = () => {
    this.setState({ isBack: !this.state.isBack })
  }

  _handleTorch = () => {
    this.setState({ isTorchOn: !this.state.isTorchOn })
  }

  render() {
    const { hasCameraPermssion, isBack, isTorchOn } = this.state

    return(
      <Container>
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
            size={25} color="#37474F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleTorch} style={[style.btn, {left: 20}]}>
          <MaterialIcons 
            name={isTorchOn ? 'flash-on' : 'flash-off'}
            size={25} color="#37474F" />
        </TouchableOpacity>
      </Container>
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