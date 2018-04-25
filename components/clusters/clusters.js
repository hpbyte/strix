import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
import { add, user } from '../partials/icons'
import { Grid, Col, Row } from "react-native-easy-grid";
import Style from '../style';

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
              <Ionicons name={user} size={26} style={Style.black} />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Search')}>
              <Ionicons name='ios-search' size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1}}>
          <Content padder>
            <Grid>
              <Col>
              {colors.map((prop, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => this.props.navigation.navigate('Cluster')}>
                    <Row style={{ height: 200, backgroundColor: prop, 
                        justifyContent: 'center', alignItems: 'center', 
                        marginBottom: 5, borderRadius: 15 }}>
                        <View>
                            <Ionicons name='logo-nodejs' size={55} color="#fff" />
                            <Text style={{ color: '#fff', fontSize: 25 }}>Row</Text>
                        </View>
                    </Row>
                  </TouchableOpacity>
                )
              })}
              </Col>
            </Grid>
          </Content>
          <TouchableOpacity style={Style.fab}
            onPress={() => this.props.navigation.navigate('Add')}>
            <Ionicons name={add} color='#fff' size={30} />
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
