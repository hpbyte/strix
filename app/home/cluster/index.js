import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import { discuss, add, more } from '../../partials/icons'
import firebaseService from '../../service/firebase'
import Style from '../../style';

const FIREBASE = firebaseService.database()

export default class Cluster extends Component {
  constructor(props) {
    super(props)
    
    this.state = { questions: [] }
  }

  componentDidMount() {
    FIREBASE.ref('questions/').on('value', (snapshot) => {
      let qArr = []

      snapshot.forEach((snap) => {
        qArr.push(snap)
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
              <Ionicons name={more} size={26} style={Style.black} />
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
                      <Thumbnail source={require("../../../assets/default.png")} />
                      <Body>
                        <Text>Luffy</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Ionicons name={more} size={25} color='#000' />
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Text>{prop.val().quiz}</Text>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent
                        onPress={() => this.props.navigation.navigate('Answer', {
                          quiz: prop.val().quiz,
                          quizId: prop.key
                        })}>
                        <Ionicons name={discuss} size={23} />
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
          <TouchableHighlight style={Style.fab}
            onPress={() => this.props.navigation.navigate('Post')}>
            <Ionicons name={add} color='#fff' size={30} />
          </TouchableHighlight>
        </View>        
      </Container>
    );
  }
}