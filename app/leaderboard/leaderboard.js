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
  Badge,
  View
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { user, search } from '../partials/icons'
import Sheader from '../partials/sheader'
import Bar from '../partials/bar'
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
        <Sheader navigation={this.props.navigation} />
        <Bar />
        <Content style={Style.bgWhite}>
          <Card style={{ marginLeft: 0 }}>
            <List
              dataArray={data}
              renderRow={(item) => 
              <View style={Style.listItem}>
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
              </View>
              }>
            </List>
          </Card>    
        </Content>
      </Container>
      );
  }
}
