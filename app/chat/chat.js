import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, View, Text } from 'native-base'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import firebaseService from '../service/firebase'
import { Ionicons } from '@expo/vector-icons'
import { back, more, send } from '../partials/icons'
import Bar from '../partials/bar'
import Style from '../style'

const FIREBASE = firebaseService.database()
const FIRECHAT = firebaseService.database().ref('chats')

export default class Chat extends Component {
  constructor(props) {
    super(props)

    const { params } = this.props.navigation.state
    const receiverId = params ? params.userId : null
    const receiverName = params ? params.userName : null

    this.state = {
      msg: '',
      messages: [],
      chatroom: null,
      receiverId: receiverId,
      receiverName: receiverName,
      senderId: firebaseService.auth().currentUser.uid,
      senderName: '',
      senderImage: ''
    }

    this.onSend = this.onSend.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
  }

  componentDidMount() {
    this.checkRoomExist()
    this.getSenderDetail()
  }

  getSenderDetail = () => {
    const senderId = this.state.senderId

    try {
      FIREBASE.ref('users').child(senderId).once('value', snapshot => {
        this.setState({
          senderName: snapshot.val().name,
          senderImage: snapshot.val().image
        })
      })
    } catch(error) { alert(error.message) }
  }

  checkRoomExist = () => {
    const { senderId, receiverId } = this.state
    let exists = false
    let room = ''
    
    try {
      FIRECHAT.once('value', snapshot => {
        snapshot.forEach(snap => {
          user1 = snap.val().user_1
          user2 = snap.val().user_2
  
          if((senderId === user1 && receiverId === user2) || (senderId === user2 && receiverId === user1)) {
            exists = true
            room = snap.key
          }
        })
      }).then(() => {
        if(exists) {
          this.setState({ chatroom: room })
          this.loadMessages()
        } else {
          // alert('Chat room not existed')
          this.createChatRoom()
        }
      })
    } catch(error) { alert(error.message) }  
  }

  createChatRoom = async() => {
    const { senderId, receiverId } = this.state

    try {
      const newRoomKey = await FIRECHAT.push({
        user_1: senderId,
        user_2: receiverId
      }).key

      this.setState({ chatroom: newRoomKey })
    }
    catch(error) { alert(error.message) }
  }

  loadMessages = async() => {
    try{
      await FIRECHAT.child(this.state.chatroom).child('messages')
        .orderByKey()
        .on('value', snapshot => {
        let msgArr = []
  
        snapshot.forEach(snap => { msgArr.push(snap.val()) })
  
        this.setState({ messages: msgArr })
      })
    } catch(error) { alert(error.message) }
  }

  async onSend() {
    const { senderId, senderName, senderImage, msg } = this.state

    try {
      await FIRECHAT.child(this.state.chatroom).child('messages').push({
        _id: Math.round(Math.random() * 1000000),
        createdAt: Date.now(),
        text: msg,
        user: {
          _id: senderId,
          name: senderName
        },
        sent: true
      }).then(() => {
        // alert('Sent!')
      })
    } catch(error) { alert(error.message) }
  }

  renderBubble(props) {
    return(
      <Bubble 
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff'
          }
        }}
      />
    )
  }

  render() {
    return (
      <Container>
        <Header noShadow style={Style.bgWhite}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.props.navigation.goBack()} >
              <Ionicons name={back} size={26} color='#000' />
            </Button>
          </Left>
          <Body style={Style.flexCenter}>
            <Title style={Style.black}>{this.state.receiverName}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Ionicons name={more} size={26} color='#000' />
            </Button>
          </Right>
        </Header>
        <Bar />
        <GiftedChat
          messages={this.state.messages.reverse()}
          text={this.state.msg}
          onInputTextChanged={msg => this.setState({ msg })}
          onSend={this.onSend}
          user={{ _id: this.state.senderId }}
          renderBubble={this.renderBubble}
        />
      </Container>
    )
  }
}