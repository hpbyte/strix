import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Thumbnail
} from 'native-base';
import Style from '../style';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Ionicons name='md-person' size={26} style={Style.black} />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Ionicons name='ios-search' size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require("../../assets/logo.png")} />
                <Body>
                  <Text>John</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              {/* <Image source={require("../../assets/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/> */}
              <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in v
                oluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Ionicons name='ios-chatbubbles' size={23} />
                  <Text>4 Answers</Text>
                </Button>
              </Left>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
