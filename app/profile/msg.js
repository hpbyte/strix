import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Content, Body, Text, Thumbnail, Button, SwipeRow, View } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { trash } from '../partials/icons'
import firebaseService from '../service/firebase'
import Style from '../style'
import style from './style'

const FIREBASE = firebaseService.database()
const FIRECHAT = firebaseService.database().ref('chats')

const chats = [
    {
        name: "Saitama",
        msg: "Hey man, long time no see",
        time: "3:23 pm"
    },
    {
        name: "Kurosaki Ichigo",
        msg: "Bankai !!!!",
        time: "1:32 am"
    },
    {
        name: "Martin Garrix",
        msg: "I'll be there for you, but you gotta be there for me too",
        time: "8:43 pm"
    },
    {
        name: "Roronoa Zoro",
        msg: "Tsuk!, everybody disapper again!",
        time: "9:01 am"
    },
    {
        name: "Lisa",
        msg: "Ah he he he he heeeee",
        time: "4:05 pm"
    },
    {
        name: "Rose`",
        msg: "Stay Stay Stay with me",
        time: "12:10 pm"
    }
]

export default class Chats extends Component {
    constructor(props) {
        super(props)
    }

    _getUserChatHistory = async() => {
        const userId = this.state.uId
        let chatArr = []

        try {
            await FIRECHAT.once('value', snapshot => {

                snapshot.forEach(snap => {
                    if(userId === snap.val().user_1) {
                        chatArr.push(snap.val().user_2)
                    } else if(userId === snap.val().user_2) {
                        chatArr.push(snap.val().user_1)
                    }
                })
            }).then(() => {
                this.setState({ chats: chatArr })
                this._getUsers()
            })
        }
        catch(error) { alert(error.message) }
    }

    _getUsers = () => {
        const chats = this.state.chats
        let userArr = []

        chats.forEach(chat => {
            let name = ''
            let image = ''
            FIREBASE.ref('users').child(chat).once('value', snapshot => {
                name = snapshot.name
                image = snapshot.image
            }).then(() => {
                userArr.push({
                    name: name,
                    image: image
                })
            })
        })

        this.setState({ users: userArr })
    }

    render() {
        return(
            <Content>
                {chats.map((prop, key) => {
                    return(
                        <SwipeRow
                            key={key}
                            disableRightSwipe={true}
                            rightOpenValue={-75}
                            body={
                            <TouchableOpacity style={style.chatRow}
                                onPress={() => alert('Chat with ...'+prop.name)}>
                                <Thumbnail source={require('../../assets/default.png')} />
                                <Body style={style.chatBody}>
                                    <Text>{prop.name}</Text>
                                    <Text note>{prop.msg}</Text>
                                </Body>
                                <Text note>{prop.time}</Text>
                            </TouchableOpacity>
                            }
                            right={
                            <Button style={Style.bgRed} onPress={() => alert('Trash')}>
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