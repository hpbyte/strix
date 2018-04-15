import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Style from '../style';
import firebaseService from '../service/firebase';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { email: firebaseService.auth().currentUser.email }
  }

  onSignOut() {
    firebaseService.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('SignedOut')
      })
      .catch((error) => {
        alert(error)
      });
  }

  render() {
    return(
      <Container>
        <Header style={Style.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='ios-arrow-back' size={26} />
            </Button>
          </Left>
          <Body>
            <Title>Your Profile</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <List>
            <ListItem avater>
              <Left>
                <Thumbnail source={require('../../assets/logo.png')} />
              </Left>
              <Body>
                <Text>James</Text>
                <Text>{this.state.email}</Text>
                <Text note>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, inventore.</Text>
              </Body>
              <Right>
                <Text note>3:23 pm</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Button
                onPress={this.onSignOut.bind(this)} >
                <Text>Logout</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
