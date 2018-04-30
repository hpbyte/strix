import React, { Component } from 'react';
import { View, Platform } from 'react-native'
import { Container, Header, Item, Input, Button, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { search } from '../partials/icons'
import Style from '../style'

export default class Search extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header} searchBar rounded>
          <Item>
            <Ionicons name={search} size={25} style={{ marginLeft: 15 }} />
            <Input placeholder="Search" autoFocus={true} />
          </Item>
          <Button transparent
            onPress={() => this.props.navigation.goBack()}>
            <Text>Cancel</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}