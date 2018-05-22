import React, { Component } from 'react'
import { Platform, View, Dimensions } from 'react-native';
import { Container, Content, Header, Thumbnail, Body, Left, Right, Button, Text, Title, Card, CardItem } from 'native-base'
import firebaseService from '../service/firebase'
import { Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { school, work, chat, mail, call, back, quote } from '../partials/icons'
import { BarChart, LineChart, YAxis, Grid } from 'react-native-svg-charts'
import Style from '../style'

const FIREBASE = firebaseService.database()

export default class Info extends Component {
    constructor(props) {
        super(props)

        const { params } = this.props.navigation.state
        const userId = params ? params.userId : null

        this.state = { uId: userId, name: '', school: '', uni: '', job: '', image: null }
    }

    componentDidMount() {
        this._getUserInfo()
    }

    _getUserInfo = async() => {
        await FIREBASE.ref('users').child(this.state.uId).once('value', snapshot => {
            this.setState({
                name: snapshot.val().name,
                skool: snapshot.val().school,
                uni: snapshot.val().uni,
                job: snapshot.val().job,
                bio: snapshot.val().bio,
                image: snapshot.val().image
            })
        })
    }

    render() {
        const { uId, name, skool, uni, job, bio, image } = this.state
        const fill = '#2a4ff0'
        const lineData = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const barData   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]

        return(
            <Container>
                {Platform.OS === 'ios' ? <View style={{height: 20, backgroundColor: '#fff'}} /> : null}
                <Header noShadow style={[Style.bgGrey, { borderBottomWidth: 0, paddingTop: 0 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button
                        transparent
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
                <Col>
                    <Row size={20} style={[Style.avater, Style.bgGrey]}>
                        {image !== null ? (<Thumbnail large source={{ uri: image }} />) : (<Thumbnail large source={require('../../assets/default.png')} />)}
                    </Row>
                    <Row size={4} style={Style.bgGrey}></Row>
                    <Row size={10} style={Style.bgGrey}>
                        <Col>
                            <Button style={[Style.iconBtn, {backgroundColor: '#43a047'}]}>
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
                            <Button style={[Style.iconBtn, {backgroundColor: '#e53935'}]}>
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
                                        <Text>Frequency</Text>
                                    </CardItem>
                                    <CardItem>
                                        <View style={{ width: (Dimensions.get('screen').width)/1.1, height: 200, flexDirection: 'row' }}>
                                            <YAxis
                                                data={ lineData }
                                                contentInset={{ top: 20, bottom: 20 }}
                                                svg={{ fill: 'grey', fontSize: 10 }}
                                                numberOfTicks={ 10 }
                                                formatLabel={ value => `${value}` } />
                                            <LineChart
                                                style={{ flex: 1, marginLeft: 16 }}
                                                data={ lineData }
                                                svg={{ stroke: 'rgb(134, 65, 244)' }} >
                                                <Grid/>
                                            </LineChart>
                                        </View>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Content>
                    </Row>
                </Col>
            </Container>
        )
    }
}