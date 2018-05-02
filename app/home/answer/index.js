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
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { more, up, down, send } from '../../partials/icons'
import Style from '../../style'
import firebaseService from '../../service/firebase'

const FIREBASE = firebaseService.database()

export default class Answer extends Component {
    constructor(props) {
        super(props)
        
        const { params } = this.props.navigation.state
        const quiz = params ? params.quiz : null
        const quizId = params ? params.quizId : null
        const qTime = params ? params.time : null

        this.state = { 
            answer: '',
            question: quiz,
            questionId: quizId,
            questionTime: qTime,
            answers: [],
            isUpClicked: false,
            isDownClicked: false
        }

        this._voteUp = this._voteUp.bind(this)
        this._voteDown = this._voteDown.bind(this)
    }

    _submitAnswer() {
        const ans = this.state.answer
        const uId = firebaseService.auth().currentUser.uid

        if(ans !== '') {
            FIREBASE.ref("answers").child(this.state.questionId).push(
                {
                    answer: ans,
                    userId: uId,
                    timestamp: moment().format("YYYY-MM-DD HH:mm"),
                    upvote: 0,
                    downvote: 0
                }, (error) => {
                    if(error) alert(error.message)
                }
            )
            // successfully submitted
            Toast.show({
                text: 'Successfully Submitted!',
                buttonText: 'OK',
                duration: 3000,
                type: 'success',
                position: 'top'
            })
            // clear the answer input field
            this.setState({ answer: '' })
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

    _voteUp(ansId) {
        FIREBASE.ref("answers/"+this.state.questionId+"/"+ansId+"/upvote").transaction(up => {
            return up + 1
        })
    }

    _voteDown(ansId) {
        FIREBASE.ref("answers/"+this.state.questionId+"/"+ansId+"/downvote").transaction(down => {
            return down + 1
        })
    }

    componentDidMount() {
        FIREBASE.ref("answers").child(this.state.questionId).on('value', snapshot => {
            let ansArr = []

            snapshot.forEach(snap => {
                ansArr.push(snap)
            })

            this.setState({ answers: ansArr })
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
                <Header noShadow style={style.ansHeader} >
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={26} style={Style.black} />
                        </Button>
                        <Button transparent style={{ marginLeft: 10 }}>
                            <Thumbnail small source={require("../../../assets/default.png")} />
                        </Button>
                        <View style={{ marginLeft: 7 }}>
                            <Text>Luffy</Text>
                            <Text style={{ fontSize: 12 }}>{moment(this.state.questionTime).fromNow()}</Text>
                        </View>
                    </Left>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                        <Ionicons name={more} size={26} style={Style.black} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={{ backgroundColor: '#fff' }}>
                        <Text style={style.quizTxt}>{ this.state.question }</Text>
                    </View>
                    <View>
                        {this.state.answers.map((prop, key) => {
                            return (
                                <Row key={key} style={{ margin: 10 }}>
                                    <Col size={10}>
                                        <Thumbnail small source={require("../../../assets/default.png")} />
                                    </Col>
                                    <Col size={90} style={{ marginLeft: 10 }}>
                                        <Row style={style.ansRow}>
                                            <Text style={style.nameTxt}>Luffy</Text>
                                            <Text style={style.ansTxt}>{prop.val().answer}</Text>
                                        </Row>
                                        <Row>
                                            <Col size={60}>
                                                <Text style={style.dateTxt}>{moment(prop.val().timestamp).fromNow()}</Text>
                                            </Col>
                                            <Col size={10}>
                                                <Button transparent style={style.updownBtn}
                                                    disabled={this.state.isUpClicked ? true : false}
                                                    onPress={() => this._voteUp(prop.key)}>
                                                    <Ionicons name={up} size={27} />
                                                </Button>
                                            </Col>
                                            <Col size={10}>
                                                <Text style={[Style.blue, style.updownTxt]}>+{prop.val().upvote}</Text>
                                            </Col>
                                            <Col size={10}>
                                                <Button transparent style={style.updownBtn}
                                                    disabled={this.state.isDownClicked ? true : false}
                                                    onPress={() => this._voteDown(prop.key)}>
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
                {Platform.OS === 'ios' ? (<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
                <Item regular style={{ padding: 5, backgroundColor: '#fff' }}>
                    <Input multiline={true} placeholder='your answer here ...' clearButtonMode='while-editing'
                        value={this.state.answer} onChangeText={answer => this.setState({answer})}/>
                    <Button transparent
                        onPress={this._submitAnswer.bind(this)}>
                        <Ionicons name={send} size={28} style={{ marginRight: 10 }} />
                    </Button>
                </Item>   
            </KeyboardAvoidingView>) : (<Form style={{ backgroundColor: '#fff'}}>
                    <KeyboardAvoidingView behavior="position" enabled>
                        <Item regular style={{ padding: 5 }}>
                            <Input multiline={true} placeholder='your answer here ...' clearButtonMode='while-editing'
                                value={this.state.answer} onChangeText={answer => this.setState({answer})} />
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
        borderRadius: 30,
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