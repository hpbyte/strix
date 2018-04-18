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

    this.state = { email: '' }
  }

  componentDidMount() {
    firebaseService.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({
          email: user.email
        })
      } else {
        this.props.navigation.navigate('SignedOut');
      }
    })
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
            <Title style={Style.black}>Your Profile</Title>
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
              <Right/>
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
