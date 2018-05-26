import React, { Component } from 'react'
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import {
    Root,
    Container,
    Thumbnail,
    Content,
    Button,
    Header,
    Left,
    Body,
    Right,
    Text,
    Title,
    Card,
    CardItem,
    Form,
    Item,
    Input,
    Toast,
    ActionSheet,
    Footer
} from 'native-base'
import { Row, Col } from 'react-native-easy-grid'
import firebaseService from '../../service/firebase'
import { Ionicons } from '@expo/vector-icons'
import { more, up, down, send, back } from '../../partials/icons'
import moment from 'moment'
import Bar from '../../partials/bar'
import Style from '../../style'

const FIREBASE = firebaseService.database()

export default class Answer extends Component {
    constructor(props) {
        super(props)
        
        const { params } = this.props.navigation.state
        const quiz = params ? params.quiz : null
        const quizId = params ? params.quizId : null
        const qTime = params ? params.time : null
        const qDur = params ? params.dur : null
        const qStus = params ? params.status : null
        const qName = params ? params.qUserName : null
        const qImage = params ? params.qUserImg : null
        const cluster = params ? params.cluster : null

        this.state = { 
            answer: '',
            question: quiz,
            questionId: quizId,
            questionTime: qTime,
            questionDur: qDur,
            questionStus : qStus,
            questionName: qName,
            questionImg: qImage,
            qCluster: cluster,
            answers: [],
            isUpClicked: false,
            isDownClicked: false,
            userId: firebaseService.auth().currentUser.uid,
            userName: '',
            userImg: ''
        }

        this._voteUp = this._voteUp.bind(this)
        this._voteDown = this._voteDown.bind(this)
    }

    componentDidMount() {
        const { questionDur, questionStus } = this.state

        if(( questionDur < moment().format("YYYY-MM-DD HH:mm") ) && questionStus) {
            this._setExpired()
        } else {
            this._getUserDetails()
            this._getAnswers()
        }
    }

    _setExpired = async() => {
        const { qCluster, questionId } = this.state
        try {
          await FIREBASE.ref('questions').child(qCluster).child(questionId).update({
            status: false
          })
        } catch(error) { alert(error) }
      }

    _getUserDetails = async() => {
        const uId = this.state.userId

        try {
            await FIREBASE.ref('users').child(uId).once('value').then((snapshot) => {
                this.setState({
                    userName: snapshot.val().name, userImg: snapshot.val().image
                })
            }).catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
    }

    _getAnswers = async() => {
        const { questionId, qCluster } = this.state

        try {
            await FIREBASE.ref('questions').child(qCluster).child(questionId).child('answers')
                .on('value', snapshot => {
                let ansArr = []
    
                snapshot.forEach(snap => { ansArr.push(snap) })
    
                this.setState({ answers: ansArr })
            })
        } catch(error) { alert(error.message) }
    }

    _submitAnswer = async() => {
        const { questionId, qCluster, answer, userId, userName, userImg } = this.state

        if(answer !== '') {
            await FIREBASE.ref('questions').child(qCluster).child(questionId).child('answers')
                .push({
                    answer: answer,
                    timestamp: moment().format("YYYY-MM-DD HH:mm"),
                    upvote: 0,
                    downvote: 0,
                    user: {
                        _id: userId,
                        name: userName,
                        image: userImg
                    }
                }, (error) => {
                    if(error) alert(error.message)
                })
                .then(() => {
                    // clear the answer input field
                    this.setState({ answer: '' })
                }).catch(error => alert(error))
        } else {
            Toast.show({
                text: 'Please type your answer first!',
                buttonText: 'OK',
                duration: 3000,
                type: 'danger',
                position: 'top'
            })
        }
    }

    _voteUp = async(ansId) => {
        const { questionId, qCluster } = this.state

        await FIREBASE.ref("questions/"+qCluster+"/"+questionId+"/answers/"+ansId+"/upvote").transaction(up => {
            return up + 1
        })
    }

    _voteDown = async(ansId) => {
        const { questionId, qCluster } = this.state
        
        await FIREBASE.ref("questions/"+qCluster+"/"+questionId+"/answers/"+ansId+"/downvote").transaction(down => {
            return down + 1
        })
    }

    componentWillUnmount() {
        Toast.toastInstance = null
        ActionSheet.actionsheetInstance = null
    }

    render() {        
        return(
        <Root>
            <Container>
                {Platform.OS === 'ios' ? <View style={{height: 10, backgroundColor: '#fff'}} /> : null}
                <Header noShadow style={style.ansHeader} >
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={back} size={26} style={Style.black} />
                        </Button>
                        <Button transparent style={{ marginLeft: 10 }}>
                            <Thumbnail small source={{ uri: this.state.questionImg }} />
                        </Button>
                        <View style={{ marginLeft: 7 }}>
                            <Text>{ this.state.questionName }</Text>
                            {this.state.questionStus ? <Text note>{moment(this.state.questionTime).fromNow()}</Text> : <Text note style={Style.red}>closed</Text>}
                        </View>
                    </Left>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                        <Ionicons name={more} size={26} style={Style.black} />
                        </Button>
                    </Right>
                </Header>
                <Bar />
                <View style={{ height: 10, backgroundColor: '#fff' }} />
                <Content>
                    <View style={{ backgroundColor: '#fff' }}>
                        <Text style={style.quizTxt}>{ this.state.question }</Text>
                    </View>
                    <View>
                    {this.state.answers.map((prop, key) => {
                        return (
                            <Row key={key} style={{ margin: 10 }}>
                                <Col size={10}>
                                    <Thumbnail small source={{ uri: prop.val().user.image }} />
                                </Col>
                                <Col size={90} style={{ marginLeft: 10 }}>
                                    <Row style={style.ansRow}>
                                        <Text style={style.nameTxt}>{prop.val().user.name}</Text>
                                        <Text style={style.ansTxt}>{prop.val().answer}</Text>
                                    </Row>
                                    <Row>
                                        <Col size={60}>
                                            <Text style={style.dateTxt}>{moment(prop.val().timestamp).fromNow()}</Text>
                                        </Col>
                                        <Col size={10}>
                                            <Button transparent style={style.updownBtn}
                                                disabled={this.state.isUpClicked ? true : false}
                                                onPress={() => this._voteUp(prop.key)}
                                                disabled={this.state.questionStus ? false : true} >
                                                <Ionicons name={up} size={27} />
                                            </Button>
                                        </Col>
                                        <Col size={10}>
                                            <Text style={[Style.blue, style.updownTxt]}>+{prop.val().upvote}</Text>
                                        </Col>
                                        <Col size={10}>
                                            <Button transparent style={style.updownBtn}
                                                disabled={this.state.isDownClicked ? true : false}
                                                onPress={() => this._voteDown(prop.key)}
                                                disabled={this.state.questionStus ? false : true} >
                                                <Ionicons name={down} size={27} />
                                            </Button>
                                        </Col>
                                        <Col size={10}>
                                            <Text style={[Style.red, style.updownTxt]}>-{prop.val().downvote}</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })}
                    </View>
                </Content>
                {Platform.OS === 'ios' ? (<KeyboardAvoidingView behavior="padding">
                <Item regular style={{ padding: 5, backgroundColor: '#fff' }}>
                    <Input 
                        multiline={true}
                        placeholder='your answer here ...'
                        clearButtonMode='while-editing'
                        value={this.state.answer}
                        onChangeText={answer => this.setState({answer})}
                        disabled={this.state.questionStus ? false : true}
                    />
                    <Button transparent
                        onPress={this._submitAnswer.bind(this)}>
                        <Ionicons name={send} size={28} style={{ marginRight: 10 }} />
                    </Button>
                </Item>   
            </KeyboardAvoidingView>) : (<Form style={{ backgroundColor: '#fff'}}>
                    <KeyboardAvoidingView behavior="position" enabled>
                        <Item regular style={{ padding: 5, backgroundColor: '#fff' }}>
                            <Input
                                multiline={true}
                                placeholder='your answer here ...'
                                value={this.state.answer}
                                onChangeText={answer => this.setState({answer})}
                                disabled={this.state.questionStus ? false : true}
                            />
                            <Button transparent
                                onPress={this._submitAnswer.bind(this)}>
                                <Ionicons name={send} size={28} style={{ marginRight: 10 }} />
                            </Button>
                        </Item>
                    </KeyboardAvoidingView>
                </Form>)}
            </Container>
        </Root>
        )
    }
}

const style = StyleSheet.create({
    ansHeader: {
        paddingTop: 20,
        borderBottomWidth: 0,
        backgroundColor: '#fff'
    },
    quizTxt: {
        margin: 15,
        marginBottom: 30
    },
    ansRow: {
        flexDirection: 'column',
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    nameTxt: {
        marginTop: 10,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "500"
    },
    ansTxt: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 15
    },
    updownBtn: {
        height: 28,
        margin: 0,
        paddingTop: 0
    },
    updownTxt: {
        fontSize: 14,
        marginTop: 3
    },
    dateTxt: {
        fontSize: 14,
        marginTop: 3,
        marginLeft: 10
    }
})