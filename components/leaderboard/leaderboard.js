import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Content,
  Text
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Style from '../style';

export default class Leaderboard extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Ionicons name='md-person' size={26} style={Style.black}/>
            </Button>
          </Left>
          <Body style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent>
              <Ionicons name='ios-search' size={26} style={Style.black}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam distinctio ratione totam, ea accusamus laboriosam iure, excepturi atque praesentium amet!
          </Text>
        </Content>
      </Container>);
  }
}
