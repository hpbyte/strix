import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import {
    Container, Text, Badge, Header, Left, Body, Right, Button, Thumbnail, List, ListItem
} from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'
import firebaseService from '../service/firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import { back } from '../partials/icons';
import Bar from '../partials/bar'
import moment from 'moment'
import Style from '../style'

const FIREBASE = firebaseService.database()
const FIRESTER = firebaseService.database().ref('booster')

export default class End extends Component {
    constructor(props) {
        super(props)

        const { params } = this.props.navigation.state
        const appmntId = params ? params.appointmentId : null
        const start = params ? params.startTime : null
        const end = params ? params.endTime : null
        const total = params ? params.totalTime : null
        const stus = params ? params.status : null

        this.state = {
            boosterId: '',
            appointmentId: appmntId,
            pupil: '',
            pupilName: '',
            pupilImg: null,
            mentor: '',
            mentorName: '',
            mentorImg: null,
            status: stus,
            totalTime: total,
            startTime: start,
            endTime: end
        }
    }

    componentDidMount() {
        this._findBoosterId()
    }

    _findBoosterId = async() => {
        const appId = this.state.appointmentId
        let pu = ''
        let men = ''
        let bId = ''

        try{
            await FIRESTER.once('value', snapshot => {
                snapshot.forEach(snap => {
                    snap.child('appointments').forEach(snp => {
                        if(appId === snp.key) {
                            bId = snap.key
                            pu = snap.val().pupil
                            men = snap.val().mentor
                        }
                    })
                })
            }).then(() => {
                this.setState({ boosterId: bId, pupil: pu, mentor: men })
                this._getUserDetails(pu, men)
            }).catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
    }

    _getUserDetails = (pId, mId) => {
        let pName = ''
        let pImg = ''
        let mName = ''
        let mImg = ''

        try {
            // get pupil
            FIREBASE.ref('users').child(pId).once('value', snapshot => {
                pName = snapshot.val().name
                pImg = snapshot.val().image
            }).then(() => {
                this.setState({ pupilName: pName, pupilImg: pImg })
            }).catch(error => alert(error))

            // get mentor
            FIREBASE.ref('users').child(mId).once('value', snapshot => {
                mName = snapshot.val().name
                mImg = snapshot.val().image
            }).then(() => {
                this.setState({ mentorName: mName, mentorImg: mImg })
            }).catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
    }

    _onPressEnd = async() => {
        const { status, boosterId, appointmentId, totalTime, startTime } = this.state
        const end = moment().format("YYYY-MM-DD HH:mm")
        const total = moment(end).diff(startTime, 'hours')

        try {
            await FIRESTER.child(boosterId).child('appointments').child(appointmentId).update({
                status: false,
                endTime: end,
                totalTime: total
            }).then(() => {
                this.setState({ status: false, endTime: end, totalTime: total })
            }).catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
    }

    render() {
        const {
            appointmentId, status, startTime, endTime, totalTime, mentor, pupil,
            pupilName, pupilImg, mentorName, mentorImg
        } = this.state

        return(
            <Container>
                <Header style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }} noShadow>
                    <Left>
                        <Button
                            transparent
                            style={Style.leftBtn}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={back} size={26} color="#000" />
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Bar />
                <Grid>
                    <Row size={20}>
                        <Col style={Style.itemCenter}>
                            <Thumbnail large source={{ uri: mentorImg }} />
                            <Text style={style.namae}>{mentorName}</Text>
                        </Col>
                        <Col style={Style.itemCenter}>
                            <Thumbnail large source={{ uri: pupilImg }} />
                            <Text style={style.namae}>{pupilName}</Text>
                        </Col>
                    </Row>
                    <Row size={10} style={style.info}>
                        {status ? <Badge style={style.txtCenter} success><Text>On Going</Text></Badge> : <Badge style={style.txtCenter}><Text>Ended</Text></Badge>}
                    </Row>
                    <Row size={20} style={style.info}>
                        <List>
                            <ListItem style={style.listItem}>
                                <Text>Started on {moment(startTime).format('Do MMM / YYYY HH:mm')}</Text>
                            </ListItem>
                            {status ? null : <ListItem style={style.listItem}><Text>Ended on {moment(endTime).format('Do MMM / YYYY HH:mm')}</Text></ListItem>}
                            {status ? null : <ListItem style={style.listItem}><Text>Total Time {totalTime} hr</Text></ListItem>}
                        </List>
                    </Row>
                    <Row size={50} style={Style.itemCenter}>
                        <TouchableOpacity onPress={this._onPressEnd.bind(this)} disabled={status ? false : true}
                            style={[Style.itemCenter, Style.bgWhite, style.btn]}>
                            <Text style={style.end}>End</Text>
                        </TouchableOpacity>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    btn: {
        width: 200,
        height: 200,
        elevation: 9,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 1.1
    },
    end: {
        fontSize: 40,
        color: '#d32f2f'
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    listItem: {
        borderBottomWidth: 0
    },
    namae: {
        marginTop: 10
    },
    txtCenter: {
        alignSelf: 'center'
    }
})