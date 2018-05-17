import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import {
    Container, Text, View, Header, Left, Body, Right, Button, Thumbnail
} from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'
import firebaseService from '../service/firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import { back } from '../partials/icons';
import Bar from '../partials/bar'
import Style from '../style'

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
            appointmentId: appmntId,
            pupil: '',
            mentor: '',
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

        try{
            await FIRESTER.once('value', snapshot => {
                snapshot.forEach(snap => {
                    snap.child('appointments').forEach(snp => {
                        if(appId === snp.key) {
                            //
                        }
                    })
                })
            }).then(() => {
                this.setState({ pupil: pu, mentor: men })
            }).catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
    }

    render() {
        const {
            appointmentId, status, startTime, endTime, totalTime
        } = this.state

        return(
            <Container>
                <Header style={{ backgroundColor: 'transparent' }} noShadow>
                    <Left>
                        <Button transparent
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
                            <Thumbnail large source={require('../../assets/default.png')} />
                            <Text>{mentor}</Text>
                        </Col>
                        <Col style={Style.itemCenter}>
                            <Thumbnail large source={require('../../assets/default.png')} />
                            <Text>{pupil}</Text>
                        </Col>
                    </Row>
                    <Row size={20}>
                        <Text style={Style.black}>{appointmentId}</Text>
                        {/* <Text style={Style.black}>{startTime}</Text>
                        <Text style={Style.black}>{endTime}</Text>
                        <Text style={Style.black}>{totalTime}</Text>
                        <Text style={Style.black}>{status ? 'TRUE' : 'FALSE'}</Text> */}
                    </Row>
                    <Row size={60} style={Style.itemCenter}>
                        <TouchableOpacity onPress={() => alert('Ended')}
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
    },
    end: {
        fontSize: 40,
        color: '#d32f2f'
    }
})