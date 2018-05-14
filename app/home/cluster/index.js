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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { discuss, add, more, back } from '../../partials/icons'
import firebaseService from '../../service/firebase'
import moment from 'moment'
import Style from '../../style';
import Bar from "../../partials/bar";

const FIREBASE = firebaseService.database()

export default class Cluster extends Component {
  constructor(props) {
    super(props)

    const { params } = this.props.navigation.state
    const clust = params ? params.cluster : null
    
    this.state = { questions: [], cluster: clust }
  }

  componentDidMount() {
    const cluster = this.state.cluster

    try {
      FIREBASE.ref('questions').child(cluster).on('value', (snapshot) => {
        let qArr = []

        snapshot.forEach((snap) => { qArr.push(snap) })

        this.setState({ questions: qArr })
      })
    } catch(error) { alert(error) }
  }

  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name={back} size={26} style={Style.black} />
            </Button>
          </Left>
          <Body style={Style.flexCenter}>
            <Title style={Style.black}>{this.state.cluster}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <MaterialIcons name="sort" size={26} style={Style.black} />
            </Button>
            <Button transparent>
              <Ionicons name={more} size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <Bar />
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
                          quizId: prop.key,
                          quiz: prop.val().quiz,
                          time: prop.val().timestamp
                        })}>
                        <Ionicons name={discuss} size={23} />
                        <Text>4 Answers</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Text>{moment(prop.val().timestamp).fromNow()}</Text>
                    </Right>
                  </CardItem>
                </Card>
              )
            })}
          </Content>
          <TouchableHighlight style={Style.fab}
            onPress={() => this.props.navigation.navigate('Post', { cluster: this.state.cluster })}>
            <Ionicons name={add} color='#fff' size={30} />
          </TouchableHighlight>
        </View>        
      </Container>
    );
  }
}
