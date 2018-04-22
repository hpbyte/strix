import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Thumbnail
} from 'native-base';
import Style from '../style';
import { Ionicons } from '@expo/vector-icons';
import firebaseService from '../service/firebase'

const FIREBASE = firebaseService.database()

// const posts = ['Luffy', 'Saitama', 'Deadpool', 'Naruto', 'Tony', 'Mardock', 'Ichigo'];

export default class Cluster extends Component {
  constructor(props) {
    super(props)
    
    this.state = { questions: [] }
  }

  componentDidMount() {
    FIREBASE.ref('questions/').on('value', (snapshot) => {
      let qArr = []

      snapshot.forEach((snap) => {
        qArr.push(snap.val())
      })

      this.setState({ questions: qArr })
    })
  }

  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='ios-arrow-back' size={26} style={Style.black} />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={Style.black}>IT</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Ionicons name='ios-more' size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1}}>
          <Content>
            {this.state.questions.map((prop, key) => {
              return(
                <Card key={key}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require("../../assets/default.png")} />
                      <Body>
                        <Text>Luffy</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Ionicons name='md-more' size={25} color='#000' />
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Text>{prop.quiz}</Text>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent>
                        <Ionicons name='ios-chatbubbles' size={23} />
                        <Text>4 Answers</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Text>11h ago</Text>
                    </Right>
                  </CardItem>
                </Card>
              )
            })}
          </Content>
          <TouchableOpacity style={Style.fab}
            onPress={() => this.props.navigation.navigate('Post')}>
            <Ionicons name='ios-add' color='#fff' size={30} />
          </TouchableOpacity>
        </View>        
      </Container>
    );
  }
}
