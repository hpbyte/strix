import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
import { Grid, Col } from "react-native-easy-grid";
import Clust from './clust';
import Style from '../style';
import FloatBtn from '../fab';

const colors = [
  '#5e35b1', '#dce775', '#00897b', '#3949ab',
  '#a5d6a7', '#00e5ff', '#f4511e', '#ffa726'
]

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
        <View style={{flex: 1}}>
          <Content>
            <Grid>
              <Col>
              {colors.map((prop, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => this.props.navigation.navigate('Cluster')}>
                    <Clust bgcolor={prop} />
                  </TouchableOpacity>
                )
              })}
              </Col>
            </Grid>
          </Content>
          <FloatBtn />
        </View>
      </Container>
    );
  }
}
