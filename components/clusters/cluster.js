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

const posts = ['Luffy', 'Saitama', 'Deadpool', 'Naruto', 'Tony', 'Mardock', 'Ichigo'];

export default class Cluster extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='ios-arrow-back' size={26} style={Style.black} />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={Style.title}>IT</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Ionicons name='ios-more' size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <Content>
          {posts.map((prop, key) => {
            return (
              <Card key={key}>
                <CardItem>
                  <Left>
                    <Thumbnail source={require("../../assets/default.png")} />
                    <Body>
                      <Text>{prop}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Ionicons name='md-more' size={25} color='#000' />
                  </Right>
                </CardItem>
                <CardItem>
                  {/* <Image source={require("../../assets/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/> */}
                  <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in v
                    oluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    blah sint occaecat cupidatat non proident,
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
            )
          })}
        </Content>
      </Container>
    );
  }
}
