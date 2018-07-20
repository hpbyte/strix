import React, { Component } from 'react';
import { View, TouchableHighlight, FlatList } from 'react-native';
import {
  Container, Header, Title, Content, Button, Left, Right, Body, Text, Card, CardItem, Thumbnail
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

    this._countAnswers.bind(this)
  }

  componentDidMount() {
    this._getQuestions()
  }

  _getQuestions = async() => {
    const cluster = this.state.cluster

    try {
      await FIREBASE.ref('questions').child(cluster)
        .orderByKey()
        .on('value', (snapshot) => {
        let qArr = []

        snapshot.forEach((snap) => {
          if(( snap.val().duration < moment().format("YYYY-MM-DD HH:mm") ) && snap.val().status) {
            // question is expired
            this._setExpired(snap.key)
            qArr.push(snap)
          } else {
            qArr.push(snap)
          }
        })

        this.setState({ questions: qArr })
      })
    } catch(error) { alert(error) }
  }

  _setExpired = async(qId) => {
    const cluster = this.state.cluster

    try {
      await FIREBASE.ref('questions').child(cluster).child(qId).update({
        status: false
      })
    } catch(error) { alert(error) }
  }

  _countAnswers(param) {
    let count = 0

    for(let key in param) {
      count++
    }

    return count
  }

  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              style={Style.leftBtn}
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
            <Button transparent
              style={Style.rightBtn}>
              <Ionicons name={more} size={26} style={Style.black} />
            </Button>
          </Right>
        </Header>
        <Bar />
        <View style={{ flex: 1}}>
          <Content>
            <FlatList 
              data={this.state.questions.reverse()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return(
                  <Card key={item.key}>
                    <CardItem>
                      <Left>
                        {item.val().user.image !== '' ? <Thumbnail source={{ uri: item.val().user.image }} /> : <Thumbnail source={require("../../../assets/default.png")} />}
                        <Body>
                          <Text>{item.val().user.name}</Text>
                          {item.val().status ? null : <Text note style={Style.red}>closed</Text>}
                        </Body>
                      </Left>
                      <Right>
                        <Ionicons name={more} size={25} color='#000' />
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Text>{item.val().quiz}</Text>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent
                          onPress={() => this.props.navigation.navigate('Answer', {
                            quizId: item.key,
                            quiz: item.val().quiz,
                            time: item.val().timestamp,
                            dur: item.val().duration,
                            status: item.val().status,
                            qUserImg: item.val().user.image,
                            qUserName: item.val().user.name,
                            cluster: this.state.cluster
                          })}>
                          <Ionicons name={discuss} size={23} />
                          <Text>{this._countAnswers(item.val().answers)} Answers</Text>
                        </Button>
                      </Left>
                      <Right>
                        <Text>{moment(item.val().timestamp).fromNow()}</Text>
                      </Right>
                    </CardItem>
                  </Card>
                )
              }}
            />
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
