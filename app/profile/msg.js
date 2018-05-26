import React, { Component } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Content, Body, Text, Thumbnail, Button, SwipeRow, View, Right } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { trash } from '../partials/icons'
import firebaseService from '../service/firebase'
import moment from 'moment'
import Style from '../style'
import style from './style'

import Chat from '../chat/chat'

const FIREBASE = firebaseService.database()
const FIRECHAT = firebaseService.database().ref('chats')

class Chats extends Component {
    constructor(props) {
        super(props)

        this.state={
            uId: firebaseService.auth().currentUser.uid,
            rooms: [],
            partnerIds: [],
            partnerNames: [],
            partnerImages: [],
            lastMsgs: [],
            lastTimes: []
        }
    }

    componentDidMount() {
        this._getChatRooms()
    }

    _getChatRooms = async() => {
        const userId = this.state.uId
        let roomArr = []
        let partnerArr = []

        try {
            await FIRECHAT
                .once('value', snapshot => {
                    snapshot.forEach(snap => {
                        if(userId === snap.val().user_1) {
                            roomArr.push(snap.key)
                            partnerArr.push(snap.val().user_2)
                        } else if(userId === snap.val().user_2) {
                            roomArr.push(snap.key)
                            partnerArr.push(snap.val().user_1)
                        }
                    })
                })
                .then(() => {
                    this.setState({ rooms: roomArr, partnerIds: partnerArr })
                    this._getPartnerDetails(partnerArr)
                    this._getLastMessages(roomArr)
                })
                .catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
    }

    _getPartnerDetails = (partners) => {
        let names = []
        let images = []

        for(let key in partners) {
            try{ 
                FIREBASE.ref('users').child(partners[key])
                    .once('value')
                    .then(snapshot => {
                        names.push(snapshot.val().name)
                        images.push(snapshot.val().image)
        
                        this.setState({ partnerNames: names, partnerImages: images })
                    })
                    .catch(error => alert(error))
            }
            catch(error) { alert(error.message) }
        }
    }

    _getLastMessages = (rooms) => {
        let msgArr = []
        let timeArr = []

        for(let key in rooms) {
            try {
                FIRECHAT.child(rooms[key]).child('messages')
                    .limitToLast(1)
                    .once('value', snapshot => {
                        snapshot.forEach(snap => {
                            msgArr.push(snap.val().text)
                            timeArr.push(snap.val().createdAt)
                        })
                    })
                    .then(() => {
                        this.setState({ lastMsgs: msgArr, lastTimes: timeArr })
                    })
            }
            catch(error) { alert(error.message) }
        }
    }

    async _deleteChat(roomId) {
        try {
            FIRECHAT.child(roomId).remove().then(() => {
                Alert.alert('Chat deleted')
            })
        }
        catch(error) { alert(error.message) }
    }

    render() {
        const { rooms, partnerIds, partnerNames, partnerImages, lastMsgs, lastTimes } = this.state

        return(
            <Content>
                {rooms.map((room, key) => {
                    return(
                        <SwipeRow
                            key={key}
                            disableRightSwipe={true}
                            rightOpenValue={-75}
                            body={
                            <TouchableOpacity style={style.chatRow}
                                onPress={() => this.props.navigation.navigate('Chat', {
                                    userId: partnerIds[key],
                                    userName: partnerNames[key]
                                })}>
                                <Thumbnail source={{ uri: partnerImages[key] }} />
                                <Body style={style.chatBody}>
                                    <Text>{partnerNames[key]}</Text>
                                    <Text style={{ marginTop: 3 }} note>{lastMsgs[key]}</Text>
                                </Body>
                                <Right>
                                    <Text style={{ marginTop: 3 }} note>
                                        {moment(lastTimes[key]).format('HH:mm')}
                                    </Text>
                                    <Text style={{ marginTop: 3 }} note>
                                        {moment(lastTimes[key]).format('MMM D')}
                                    </Text>
                                </Right>
                            </TouchableOpacity>
                            }
                            right={
                            <Button style={Style.bgRed}
                                onPress={() => this._deleteChat(room)}>
                                <Ionicons name={trash} size={27} />
                            </Button>
                            }
                        />
                    )
                })}
            </Content>
        )
    }
}

export default Chats = StackNavigator(
    {
        Chats: { screen: Chats },
        Chat: { screen: Chat }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Chats'
    }
)