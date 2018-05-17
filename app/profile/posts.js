import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Content, Text, Left, Right, Body, List, ListItem, View, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { right } from '../partials/icons'
import firebaseService from '../service/firebase'
import style from './style'

import Answer from '../home/answer'

const FIREBASE = firebaseService.database()

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = { questions: [] }
    }

    componentDidMount() {
        this._getMyPosts()
    }

    _getMyPosts = async() => {
        const uId = firebaseService.auth().currentUser.uid
        let qArr = []
        
        await FIREBASE.ref("questions").once("value", snapshot => {
            snapshot.forEach(snap => {
                snap.forEach(snp => {
                    if(snp.val().user._id === uId) {
                        qArr.push(snp)
                    }
                })
            })
        }).then(() => {
            this.setState({ questions: qArr })
        }).catch(error => alert(error))
    }

    render() {
        return(
            <Content>
                <List
                    dataArray={this.state.questions}
                    renderRow={q => 
                        <View style={{ borderLeftColor: '#d32f2f', borderLeftWidth: 5 }}>
                            <ListItem style={style.postItem}>
                                <Body>
                                    <Text>{q.val().quiz}</Text>
                                </Body>
                                <Right>
                                    <Button transparent
                                        onPress={() => this.props.navigation.navigate('Answer', {
                                            quizId: q.key,
                                            quiz: q.val().quiz,
                                            time: q.val().timestamp,
                                            qUserImg: q.val().user.image,
                                            qUserName: q.val().user.name
                                        })}>
                                        <Ionicons name={right} size={28} style={{ marginLeft: 15 }}/>
                                    </Button>
                                </Right>
                            </ListItem>
                        </View>
                    }>
                </List>
            </Content>
        )
    }
}

export default Posts = StackNavigator(
    {
        Posts: { screen: Posts },
        Answer: { screen: Answer }
    },
    {
        headerMode: "none",
        initialRouteName: "Posts"
    }
)