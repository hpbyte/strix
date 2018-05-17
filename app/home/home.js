import React, { Component } from 'react';
import {
  View, TouchableHighlight, TouchableOpacity, ImageBackground, Dimensions
} from 'react-native';
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
import Bar from '../partials/bar'
import Sheader from '../partials/sheader'
import Style from '../style';

const FIREBASE = firebaseService.database()
const WIDTH = Dimensions.get('screen').width / 1.02
const HEIGHT = Dimensions.get('screen').height / 3.7
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
        <Sheader navigation={this.props.navigation} />
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
                            <Text style={[Style.white, {fontSize: 25}]}>{prop.cluster}</Text>
                        </View>
                    </Row>
                    {/* <View style={{ borderRadius: 20 }}>
                      <ImageBackground source={{ uri: prop.bgimg }} style={[
                        Style.itemCenter, { width: WIDTH, height: HEIGHT, margin: 5, padding: 0
                        }]}>
                        <Text style={[Style.white, {fontSize: 25, margin: 30}]}>{prop.cluster}</Text>
                      </ImageBackground>
                    </View> */}
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
