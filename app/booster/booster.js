import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content, 
    List, 
    ListItem, 
    Thumbnail,
    Button,
    Text, 
    Body,
    Left,
    Right,
    Title,
    View,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { user, search } from '../partials/icons'
import firebaseService from '../service/firebase'
import Style from '../style'

export default class Booster extends Component {
  constructor(props) {
    super(props)

    this.state = { code: firebaseService.auth().currentUser.uid }
  }

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
          <Body style={Style.flexCenter}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Search')}>
              <Ionicons name={search} size={26} style={Style.black}/>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Booster</Text>
          </View>
        </Content>
      </Container>
    );
  }
}