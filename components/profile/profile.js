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
import { onSignOut } from '../auth/chk';
import { Ionicons } from '@expo/vector-icons';
import Style from '../style';
import Home from '../home/home';

export default class Profile extends Component {
  render() {
    return(
      <Container>
        <Header style={Style.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Home')}>
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
                <Text note>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, inventore.</Text>
              </Body>
              <Right>
                <Text note>3:23 pm</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Button
                onPress={() => {
                  onSignOut().then(() => this.props.navigation.navigate('SignedOut'))
                }}
                >
                <Text>Logout</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
