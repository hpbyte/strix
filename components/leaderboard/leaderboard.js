import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title,
  Button,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Badge
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { user } from '../partials/icons'
import Style from '../style';

const data = [
  'Monkey D. Luffy',
  'Roronoa Zorro',
  'Sanji',
  'Tony Tony Chopper',
  'Nami',
  'Usopp',
  'Franky',
  'Brook',
  'Nico Robin',
  'Trafalgar D. Water Law',
  'Gold D. Roger',
  'Portgas D. Ace'
];
const dataIndex = 0;

export default class Leaderboard extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Ionicons name={user} size={26} style={Style.black}/>
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
            <Button transparent>
              <Ionicons name='ios-search' size={26} style={Style.black}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <List
            dataArray={data}
            renderRow={(item) => 
              <ListItem>
                <Thumbnail square size={80} source={require('../../assets/default.png')} />
                <Body>
                  <Text>{item}</Text>
                </Body>
                <Right>
                  <Badge style={Style.bgBlue}>
                    <Text>{++dataIndex}</Text>
                  </Badge>
                </Right>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
      );
  }
}
