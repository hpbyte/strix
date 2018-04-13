import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Card,
  CardItem
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Style from '../style';

export default class Clusters extends Component {
  render() {
    return(
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
            <CardItem header style={Style.bgRed}>
              <Text style={Style.white}>Lorem ipsum dolor sit amet.</Text>
            </CardItem>
            <CardItem  style={Style.bgRed}>
              <Body>
                <Text style={Style.white}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A omnis quas ipsum, assumenda sunt possimus suscipit accusamus magnam cupiditate esse?
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
