import React, { Component } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Content, Text, Left, Right, Body, View, Button, Card, CardItem } from 'native-base'
import { Row, Col } from 'react-native-easy-grid'
import moment from 'moment'
import firebaseService from '../service/firebase'
import Style from '../style'

import Answer from '../home/answer'

const FIREBASE = firebaseService.database()

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = { questions: [], uId: firebaseService.auth().currentUser.uid }
    }

    componentDidMount() {
        this._getMyPosts()
    }

    _getMyPosts = async() => {
        let qArr = []

        await FIREBASE.ref("questions").once("value", snapshot => {
            snapshot.forEach(snap => {
                snap.forEach(snp => {
                    if(snp.val().user._id === this.state.uId) {
                        qArr.push(snp)
                    }
                })
            })
        }).then(() => {
            this.setState({ questions: qArr })
        }).catch(error => alert(error))
    }

    async _deletePost(qId) {
        try {
            FIREBASE.ref("questions").child(qId).remove().then(() => {
                Alert.alert('Post deleted')
            })
        }
        catch(error) { alert(error.message) }
    }

    render() {
        return(
            <Content padder>
                {this.state.questions.map(q => (
                    <Card key={q.key}>
                        <CardItem>
                            <Left>
                                <Body>
                                  <Text style={{ fontSize: 17 }}>{q.val().quiz}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{moment(q.val().timestamp).format('Do')}</Text>
                                <Text style={{ fontSize: 14 }}>{moment(q.val().timestamp).format('MMM / YYYY')}</Text>
                            </Right>
                        </CardItem>
                        <CardItem footer bordered>
                            <Row>
                                <Col style={Style.flexCenter}>
                                    <TouchableOpacity>
                                      <Text style={Style.blue}>Edit</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={Style.flexCenter}>
                                    <TouchableOpacity onPress={() => this._deletePost(q.key)}>
                                      <Text style={Style.red}>Delete</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </CardItem>
                    </Card>
                ))}
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
