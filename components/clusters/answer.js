import React, { Component } from 'react'
import { View, Platform, KeyboardAvoidingView } from 'react-native'
import {
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
    Footer
} from 'native-base'
import { Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { more, up, down, send } from '../partials/icons'
import Style from '../style'

const answers = [
    'ok this is it',
    'wait what ?',
    'are you sure about that ?',
    'you must be thinking wrong',
    'i am just too good at goodbyes',
    'all you have to do is stay',
    'welcome to the club where everybody hates me welcome to the club where everybody hates me welcome to the club where everybody hates me',
    'i am just a clown',
    'a minute, a second just stay',
    'i know you know you know me well',
    'i love it i hate it and i cant take it',
    'but i keep on coming back to you'
]

const IosInput = () => {
    return(
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
            <Item regular style={{ padding: 5, backgroundColor: '#fff' }}>
                <Input multiline={true} placeholder='your answer here ...' />
                <Button transparent>
                    <Ionicons name={send} size={28} style={{ marginRight: 10 }} />
                </Button>
            </Item>   
        </KeyboardAvoidingView>
    )
}

const MdInput = () => {
    return(
        <Form style={{ backgroundColor: '#fff'}}>
            <KeyboardAvoidingView behavior="position" enabled>
                <Item regular style={{ padding: 5 }}>
                    <Input multiline={true} placeholder='your answer here ...' />
                    <Button transparent>
                        <Ionicons name={send} size={28} style={{ marginRight: 10 }} />
                    </Button>
                </Item>
            </KeyboardAvoidingView>
        </Form>
    )
}

export default class Answer extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const { params } = this.props.navigation.state
        const quiz = params ? params.quiz : null
        const marRight = Platform.OS === 'ios' ? 15 : 0

        return(
            <Container>
                <Header style={Style.bgWhite} noShadow>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={26} style={Style.black} />
                        </Button>
                        <Button transparent style={{ marginLeft: 10 }}>
                            <Thumbnail small source={require("../../assets/default.png")} />
                        </Button>
                        <View style={{ marginLeft: 7 }}>
                            <Text>Luffy</Text>
                            <Text style={{ fontSize: 12 }}>3 hr ago</Text>
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
                        <Text style={{ margin: 15, marginBottom: 30 }}>{ JSON.stringify(quiz) }</Text>
                    </View>
                    <View>
                        {answers.map((prop, key) => {
                            return(
                            <Row key={key} style={{ margin: 10 }}>
                                <Col size={10}>
                                    <Thumbnail small source={require("../../assets/default.png")} />
                                </Col>
                                <Col size={90} style={{ marginLeft: 10, borderRadius: 30, backgroundColor: '#fff' }}>
                                    <Row>
                                        <Col size={80}>
                                            <Text style={{ margin: 10, marginLeft: 15 }}>{prop}</Text>
                                        </Col>
                                        <Col size={10}>
                                            <Button transparent style={{ margin: 0, padding: 0 }}>
                                                <Ionicons name={up} size={27} />
                                            </Button>
                                            <Text style={[Style.blue, { fontSize: 12, marginTop: -10 }]}>28</Text>
                                        </Col>
                                        <Col size={10}>
                                            <Button transparent style={{ margin: 0, padding: 0 }}>
                                                <Ionicons name={down} size={27} />
                                            </Button>
                                            <Text style={[Style.red, { fontSize: 12, marginTop: -10 }]}>15</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            )
                        })}
                    </View>
                </Content>
                {Platform.OS === 'ios' ? <IosInput /> : <MdInput />}
            </Container>
        )
    }
}