import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { TabNavigator } from 'react-navigation'
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
  FooterTab
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { logout, chat, pulse, menu, quote } from '../partials/icons'
import { signedOut } from '../auth/check'
import Style from '../style';

import Activity from './activity'
import Detail from './detail'

const ProfileTaber = TabNavigator(
    {
        Detail: { screen: Detail },
        Activity: { screen: Activity }
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarComponent: props => {
            return (
                <Footer>
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
                            onPress={() => props.navigation.navigate('Activity')}>
                            <Ionicons name={quote} size={28} color="#000" />
                            <Text style={Style.black}>Posts</Text>
                        </Button>
                        <Button vertical
                            onPress={() => props.navigation.navigate('Activity')}>
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
  }

  _onSignOut() {
    firebaseService.auth().signOut()
      .then(() => {
        // remove from storage
        signedOut();        
        this.props.navigation.navigate('SignedOut')
      })
      .catch((error) => {
        alert(error)
      });
  }

  render() {
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
              onPress={this._onSignOut.bind(this)}>
              <Ionicons name={logout} size={27} color='#fff' />
            </Button>
          </Right>
        </Header>
        <Grid>
          <Row size={25} style={[Style.bgBlack, Style.itemCenter]}>
            <Thumbnail large source={require('../../assets/default.png')} />
          </Row>
          <Row size={75}>
            <ProfileTaber />
          </Row>
        </Grid>
      </Container>
    );
  }
}
