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
    Title
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { user, search } from '../partials/icons'
import Style from '../style'

export default class Noti extends Component {
  render() {
    const arr = [
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
        'Its time to build a difference . .',
    ]

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
            <Button transparent
              onPress={() => this.props.navigation.navigate('Search')}>
              <Ionicons name={search} size={26} style={Style.black}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <List
            dataArray={arr}
            renderRow={(a) => 
                <ListItem>
                    <Text>{a}</Text>
                </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}