import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { Container, Text } from 'native-base'
import { BarCodeScanner, Permissions } from 'expo'
import ViewFinder from 'react-native-view-finder'
import firebaseService from '../service/firebase'
import moment from 'moment'

import Result from './result'

const FIRESTER = firebaseService.database().ref('booster')

export default class QRScanner extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      userId: firebaseService.auth().currentUser.uid,
      boosterId: null,
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

  _handleBarCodeRead = async({type, data}) => {
    this._checkBoosterExist(type, data)
  }

  _checkBoosterExist = (type, mentorId) => {
    const userId = this.state.userId
    let exists = false
    let booster = ''
    
    try {
      FIRESTER.once('value', snapshot => {
        snapshot.forEach(snap => {
          pupil = snap.val().pupil
          mentor = snap.val().mentor
  
          if(userId === pupil && mentorId === mentor) {
            exists = true
            booster = snap.key
          }
        })
      }).then(() => {
        if(exists) {
          this.setState({ boosterId: booster })
          this._createAppointment(booster, type, mentorId)
        } else {
          this._createBooster(type, mentorId)
        }
      })
    } catch(error) { alert(error.message) }  
  }

  _createBooster = async(type, mentorId) => {
    const userId = this.state.userId
    
    try {
      const newBooster = await FIRESTER.push({
        pupil : userId,
        mentor: mentorId
      }).key

      this.setState({ boosterId: newBooster })

      this._createAppointment(newBooster, type, mentorId)
    }
    catch(error) { alert(error.message) }
  }

  _createAppointment = async(boosterId, type, mentorId) => {
    const { modalVisible } = this.state
    
    if(modalVisible) {
      return
    }

    try{
      await FIRESTER.child(boosterId).child('appointments').push(
        {
          status: true,
          startTime: moment().format("YYYY-MM-DD HH:mm"),
          endTime: '',
          totalTime: ''
        }, (error) => {
          if(error) alert(error.message)
        }
      ).then(() => {
        this.setState({ type, data: mentorId, modalVisible: true })
      })
    }
    catch(error) { alert(error.message) }
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