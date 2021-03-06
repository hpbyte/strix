import React, { Component } from 'react'
import { Platform, View, Linking, StatusBar } from 'react-native';
import {
    Container, Content, Header, Thumbnail, Body, Left, Right, Button, Text, Title, Card, CardItem
} from 'native-base'
import firebaseService from '../service/firebase'
import { Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { school, work, chat, mail, call, back, quote } from '../partials/icons'
import { 
    LineChart, YAxis, Grid, ProgressCircle, PieChart
} from 'react-native-svg-charts'
import Style from '../style'

const FIREBASE = firebaseService.database()

export default class Info extends Component {
    constructor(props) {
        super(props)

        const { params } = this.props.navigation.state
        const userId = params ? params.userId : null

        this.state = { 
            uId: userId, name: '', school: '', uni: '', job: '', image: null, phone: '', email: ''
        }
    }

    componentDidMount() {
        this._getUserInfo()
        this._getUserPoints()
    }

    _getUserPoints = async() => {
        await FIREBASE.ref('users').child(this.state.uId).once('value', (snapshot) => {
            this.setState({ points: snapshot.val().points })
        })
    }

    _getUserInfo = async() => {
        await FIREBASE.ref('users').child(this.state.uId).once('value').then((snapshot) => {
            this.setState({
                name: snapshot.val().name,
                skool: snapshot.val().school,
                uni: snapshot.val().uni,
                job: snapshot.val().job,
                bio: snapshot.val().bio,
                image: snapshot.val().image,
                phone: snapshot.val().phone
            })
        }).catch(error => alert(error))
    }

    _makeACall = () => {
        const ph = this.state.phone
        if(ph === '') {
            alert('Phone Number is not specified!')
        } else {
            Linking.openURL('tel:'+ph)
        }
    }

    _sendAMail = () => {
        const mail = this.state.email
        if(mail === '') {
            alert('Email is not specified!')
        } else {
            Linking.openURL('mailto:'+mail)
        }
    }

    render() {
        const { uId, name, skool, uni, job, bio, image } = this.state        
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ 50, 10, 40, 95 ]
        const contentInset = { top: 20, bottom: 20 }

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data2
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return(
            <Container>
                {Platform.OS === 'ios' ? <View style={{height: 20, backgroundColor: '#424242'}} /> : null}
                <Header noShadow style={[Style.bgGrey, { borderBottomWidth: 0, paddingTop: 0 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button
                            transparent
                            style={Style.leftBtn}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={back} size={28} color='#fff' />
                        </Button>
                    </Left>
                    <Body style={Style.flexCenter}>
                        <Title style={Style.white}>{name}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Bar />
                {Platform.OS === 'ios' ? <StatusBar barStyle="light-content" /> : null}
                <Col>
                    <Row size={20} style={[Style.avater, Style.bgGrey]}>
                        {image !== null ? (<Thumbnail large source={{ uri: image }} />) : (<Thumbnail large source={require('../../assets/default.png')} />)}
                    </Row>
                    <Row size={4} style={Style.bgGrey}></Row>
                    <Row size={10} style={Style.bgGrey}>
                        <Col>
                            <Button style={[Style.iconBtn, {backgroundColor: '#43a047'}]} onPress={() => this._makeACall()}>
                                <Ionicons name={call} size={25} color="#fff" />
                            </Button>
                        </Col>
                        <Col>
                            <Button style={[Style.iconBtn, {backgroundColor: '#039be5'}]} onPress={() => this.props.navigation.navigate('Chat', {
                                    userId: uId,
                                    userName: name
                                })} >
                                <Ionicons name={chat} size={25}  color="#fff" />
                            </Button>
                        </Col>
                        <Col>
                            <Button style={[Style.iconBtn, {backgroundColor: '#e53935'}]} onPress={() => this._sendAMail()}>
                                <Ionicons name={mail} size={25} color="#fff" />
                            </Button>
                        </Col>
                    </Row>
                    <Row size={1} style={Style.bgDgrey}></Row>
                    <Row size={65}>
                        <Content>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text>Basic Info</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text style={{ fontSize: 15, margin: 10 }}>
                                            <Ionicons name={quote} size={20} />     {bio}
                                        </Text>
                                    </CardItem>
                                    <CardItem>
                                        <Ionicons name={school} size={27} color="#E64A19" />
                                        <Text style={Style.pdlf}>{skool}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Ionicons name={school} size={27} color="#00796B" />
                                        <Text style={Style.pdlf}>{uni}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Ionicons name={work} size={27} color="#AFB42B" />
                                        <Text style={Style.pdlf}>{job}</Text>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem header bordered> 
                                        <Text>Points + Status</Text>
                                    </CardItem>
                                    <CardItem> 
                                        <Text style={{ fontSize: 21, color: '#d32f2f' }}>{this.state.points} XP</Text>
                                    </CardItem>
                                    <ProgressCircle
                                        style={{ height: 100, marginBottom: 15 }}
                                        progress={ 0.4 }
                                        progressColor={'#2a4ff0'}
                                    />
                                </Card>
                                <Card>
                                    <CardItem header bordered>
                                        <Text>Achievement Track</Text>
                                    </CardItem>
                                    <View style={{ height: 250, flexDirection: 'row', margin: 10 }}>
                                        <YAxis
                                            data={ data }
                                            contentInset={ contentInset }
                                            svg={{
                                                fill: '#000',
                                                fontSize: 10,
                                            }}
                                            numberOfTicks={ 16 }
                                            formatLabel={ value => `${value}` }
                                        />
                                        <LineChart
                                            style={{ flex: 1, marginLeft: 16 }}
                                            data={ data }
                                            svg={{ stroke: '#2a4ff0' }}
                                            contentInset={ contentInset }
                                        >
                                            <Grid/>
                                        </LineChart>
                                    </View>
                                </Card>
                                <Card>
                                    <CardItem header bordered>
                                        <Text>By Cluster</Text>
                                    </CardItem>
                                    <PieChart
                                        style={{ height: 200, margin: 15 }}
                                        data={ pieData }
                                    />
                                </Card>
                            </Col>
                        </Content>
                    </Row>
                </Col>
            </Container>
        )
    }
}