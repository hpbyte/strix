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
              <Ionicons name='ios-person' size={26} style={Style.black} />
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
            <CardItem cardBody>
              {/* <Image source={require("../../assets/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/> */}
              <Text>this is a text message</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Ionicons name='md-thumbs-up' size={23} />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Ionicons name='ios-chatbubbles' size={23} />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
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
