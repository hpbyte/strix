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
        {Platform.OS === 'ios' ? <View style={{ height: 20, backgroundColor: '#fff' }} /> : null}
        <Header style={[Style.header, Style.bgBlack]} searchBar rounded>
          <Item style={Style.bgWhite}>
            <Ionicons name={search} size={25} style={{ marginLeft: 15 }} />
            <Input placeholder="Search" autoFocus={true} />
          </Item>
          <Button transparent
            onPress={() => this.props.navigation.goBack()}>
            <Text style={Style.white}>Cancel</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}