import React, { Component } from 'react';
import { Platform, View, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { ImagePicker, Permissions } from 'expo'
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  List,
  ListItem,
  Footer,
  FooterTab,
  Toast,
  ActionSheet,
  Spinner
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { logout, chat, pulse, menu, quote, camera, back } from '../partials/icons'
import { signedOut } from '../auth/check'
import Bar from '../partials/bar'
import Style from '../style'
import style from './style'
import firebaseService from '../service/firebase'

const FIREBASE = firebaseService.database()
const STORAGE = firebaseService.storage()

import Activity from './activity'
import Detail from './detail'
import Messages from './msg'
import Posts from './posts'

const ProfileTaber = TabNavigator(
    {
      Detail: { screen: Detail },
      Activity: { screen: Activity },
      Posts: { screen: Posts },
      Messages: { screen: Messages }
    },
    {
      tabBarPosition: 'top',
      swipeEnabled: false,
      animationEnabled: true,
      tabBarComponent: props => {
          return (
            <Footer style={{ borderBottomColor: '#000', borderBottomWidth: 0.3 }}>
                <FooterTab style={Style.bgWhite}>
                    <Button vertical
                        onPress={() => props.navigation.navigate('Detail')}>
                        <Ionicons name={menu} size={28} color="#000" />
                        <Text style={Style.black}>Detail</Text>
                    </Button>
                    <Button vertical
                        onPress={() => props.navigation.navigate('Activity')}>
                        <Ionicons name={pulse} size={28} color="#000" />
                        <Text style={Style.black}>Activity</Text>
                    </Button>
                    <Button vertical
                        onPress={() => props.navigation.navigate('Posts')}>
                        <Ionicons name={quote} size={28} color="#000" />
                        <Text style={Style.black}>Posts</Text>
                    </Button>
                    <Button vertical
                        onPress={() => props.navigation.navigate('Messages')}>
                        <Ionicons name={chat} size={28} color="#000" />
                        <Text style={Style.black}>Chats</Text>
                    </Button>
                </FooterTab>
            </Footer>
          )
      }
    }
)

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = { uId: firebaseService.auth().currentUser.uid, image: null, hasCamerRollPermission: null }
  }

  async componentDidMount() {
    this._requestCameraRollPermission()
    // get profile image
    await FIREBASE.ref('users/'+this.state.uId).once('value', snapshot => {
      this.setState({ image: snapshot.val().image })
    })
  }

  _requestCameraRollPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({ hasCamerRollPermission: status === 'granted' })
  }

  _signOut = async() => {
    await firebaseService.auth().signOut()
      .then(() => {
        // remove from storage
        signedOut();        
        this.props.navigation.navigate('SignedOut')
      })
      .catch((error) => {
        alert(error)
      });
  }

  _pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1]
    })
    
    this._handleImagePicked(result)
  }

  _handleImagePicked = async(pickerResult) => {
    if(!pickerResult.cancelled) {
      await this._uploadImage(pickerResult.uri)
        .then(() => {
          this._setImageUrl()

          Toast.show({
            text: 'Successfully Uploaded!',
            buttonText: 'OK',
            duration: 3000,
            type: 'success',
            position: 'top'
          })
        })
        .catch(error => {
          Toast.show({
            text: error,
            buttonText: 'OK',
            duration: 3000,
            type: 'danger',
            position: 'top'
          })
        })
    }
  }

  _uploadImage = async(uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const ref = STORAGE.ref().child("profile_pics/"+this.state.uId)

    return ref.put(blob)
  }

  _setImageUrl = () => {
    const img = STORAGE.ref('profile_pics/'+this.state.uId)

    img.getDownloadURL().then(url => {
      FIREBASE.ref('users/'+this.state.uId).update({
        image: url
      }).catch(error => alert(error.message))
    }).catch(error => alert(error.message))
  }

  componentWillUnmount() {
    Toast.toastInstance = null
    ActionSheet.actionsheetInstance = null
  }

  render() {
    let { image } = this.state

    return(
      <Container>
        {Platform.OS === 'ios' ? <View style={{height: 20, backgroundColor: '#000' }} /> : null}
        <Header noShadow style={[Style.bgBlack, { borderBottomWidth: 0, paddingTop: 0 }]}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name={back} size={28} color='#fff' />
            </Button>
          </Left>
          <Body style={Style.flexCenter}>
            <Title style={Style.white}>Your Profile</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={this._signOut.bind(this)}>
              <Ionicons name={logout} size={27} color='#fff' />
            </Button>
          </Right>
        </Header>
        <Bar />
        {Platform.OS === 'ios' ? <StatusBar barStyle="light-content" /> : null}
        <Grid>
          <Row size={25} style={Style.avater}>
            {image !== null ? (<Thumbnail large source={{ uri: image }} />) : (<Thumbnail large source={require('../../assets/default.png')} />)}
            <Ionicons name={camera} size={27} color="#fff" style={Style.camera}
              onPress={this._pickImage} />
          </Row>
          <Row size={75}>
            <ProfileTaber />
          </Row>
        </Grid>
      </Container>
    );
  }
}
