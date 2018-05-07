import React, { Component } from 'react';
import { Platform, View } from 'react-native';
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
  ActionSheet
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { logout, chat, pulse, menu, quote, camera } from '../partials/icons'
import { signedOut } from '../auth/check'
import Bar from '../partials/bar'
import Style from '../style'
import style from './style'
import firebaseService from '../service/firebase'

const storage = firebaseService.storage()

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

    this.state = { image: null }
  }

  componentDidMount() {
    const img = storage.ref('profile_pics/'+firebaseService.auth().currentUser.uid)
    img.getDownloadURL().then(url => {
      this.setState({ image: url })
    }).catch(error => {
      switch (error.code) {
        case 'storage/object_not_found':
          alert('File Not Found')
          break;
    
        case 'storage/unauthorized':
          alert('Unauthorized Action')
          break;
    
        case 'storage/unknown':
          alert('Unknown error occurred!')
          break;
      }
    })
  }

  componentWillUnmount() {
    Toast.toastInstance = null
    ActionSheet.actionsheetInstance = null
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
    // ask for camera roll permission in ios
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status !== 'granted') {
      alert('Camera Roll Permission not granted!')
    }
    // pick image
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1]
    })
    
    this._handleImagePicked(result)
  }

  _handleImagePicked = async(pickerResult) => {
    if(!pickerResult.cancelled) {
      // uploadUrl = await this._uploadImage(pickerResult.uri)
      // this.setState({ image: uploadUrl })
      await this._uploadImage(pickerResult.uri).then(() => {
        Toast.show({
          text: 'Successfully Uploaded!',
          buttonText: 'OK',
          duration: 3000,
          type: 'success',
          position: 'top'
        })
      }).catch(error => {
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
    const ref = storage.ref().child("profile_pics/"+firebaseService.auth().currentUser.uid)

    return ref.put(blob)
  }

  render() {
    let { image } = this.state

    return(
      <Container>
        {Platform.OS === 'ios' ? <View style={{height: 20, backgroundColor: '#fff'}} /> : null}
        <Header noShadow style={[Style.bgBlack, { borderBottomWidth: 0, paddingTop: 0 }]}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='ios-arrow-back' size={28} color='#fff' />
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
        <Grid>
          <Row size={25} style={style.avater}>
            <Thumbnail large source={{ uri: image }} />
            <Ionicons name={camera} size={27} color="#fff" style={style.camera}
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
