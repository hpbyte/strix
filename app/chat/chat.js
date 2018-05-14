import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, View, Text } from 'native-base'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import firebaseService from '../service/firebase'
import { Ionicons } from '@expo/vector-icons'
import { back, more, send } from '../partials/icons'
import Bar from '../partials/bar'
import Style from '../style'

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
      sender: firebaseService.auth().currentUser.uid,
    }

    this.onSend = this.onSend.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
    this.createChatRoom = this.createChatRoom.bind(this)
  }

  componentDidMount() {
    this.checkRoomExist()
  }

  checkRoomExist = () => {
    const { sender, receiverId } = this.state
    let exists = false
    let room = ''
    
    try {
      FIRECHAT.once('value', snapshot => {
        snapshot.forEach(snap => {
          user1 = snap.val().user_1
          user2 = snap.val().user_2
  
          if((sender === user1 && receiverId === user2) || (sender === user2 && receiverId === user1)) {
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

  async createChatRoom() {
    const { sender, receiverId } = this.state

    try {
      const newRoomKey = await FIRECHAT.push({
        user_1: sender,
        user_2: receiverId
      }).key

      this.setState({ chatroom: newRoomKey })
    }
    catch(error) { alert(error.message) }
  }

  loadMessages = async() => {
    try{
      await FIRECHAT.child(this.state.chatroom).child('messages').on('value', snapshot => {
        let msgArr = []
  
        snapshot.forEach(snap => { msgArr.push(snap.val()) })
  
        this.setState({ messages: msgArr })
      })
    } catch(error) { alert(error.message) }
  }

  onSend() {
    
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
          messages={this.state.messages}
          text={this.state.msg}
          onInputTextChanged={msg => this.setState({ msg })}
          onSend={this.onSend}

          user={{ _id: this.state.sender }}

          renderBubble={this.renderBubble}
        />
      </Container>
    )
  }
}