import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
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
import firebaseService from '../service/firebase'
import Style from '../style';
import Bar from '../partials/bar'

const FIREBASE = firebaseService.database()
const colors = [
  '#757575', '#3949ab', '#00897b', '#546e7a', '#4527a0', '#1388e5', 
  '#616161', '#303f9f', '#00796b', '#455a64', '#311b92', '#1976d2',
  '#424242', '#283593', '#00695c', '#37474f', '#4e342e', '#1565c0',
  '#212121', '#1a237e', '#004d40', '#263238', '#3e2723', '#0d47a1',
]

export default class Clusters extends Component {
  constructor(props) {
    super(props)

    this.state = { clusters: [] }
    this.generateRandomColor.bind(this)
  }

  generateRandomColor = () => {
    return Math.floor(Math.random() * colors.length)
  }

  componentDidMount() {
    try {
      FIREBASE.ref('clusters/').once('value', (snapshot) => {
        let cArr = []

        snapshot.forEach((s) => {
          s.forEach(ss => {
            ss.forEach(sss => {
              cArr.push(sss.val())
            })
          })
        })

        this.setState({ clusters: cArr })
      })
    } catch(error) { alert(error) }
  }

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
          <Body style={Style.flexCenter}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Search')}>
              <Ionicons name='ios-search' size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <Bar />
        <View style={{flex: 1}}>
          <Content>
            <Grid>
              <Col>
              {this.state.clusters.map((prop, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => this.props.navigation.navigate('Cluster', { cluster: prop.cluster })}>
                    <Row style={[Style.itemCenter, {height:200, backgroundColor: colors[this.generateRandomColor()]}]}>
                        <View>
                            {/* <Ionicons name='logo-nodejs' size={55} color="#fff" /> */}
                            <Text style={[Style.white, {fontSize: 25}]}>{prop.cluster}</Text>
                        </View>
                    </Row>
                  </TouchableOpacity>
                )
              })}
              </Col>
            </Grid>
          </Content>
          <TouchableHighlight style={Style.fab}
            onPress={() => this.props.navigation.navigate('Add')}>
            <Ionicons name={add} color='#fff' size={30} />
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}
