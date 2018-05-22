import React, { Component } from 'react'
import {
    Card, List, ListItem, Left, Body, Right, Button, Text
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { calendar, menu } from '../partials/icons'
import moment from 'moment'
import firebaseService from '../service/firebase'

const FIRESTER = firebaseService.database().ref('booster')

export default class Tab2 extends Component {
    constructor(props) {
        super(props)

        this.state = { userId: firebaseService.auth().currentUser.uid, appoints: [] }
    }

    componentDidMount() {
        this._findAppointments()
    }

    _findAppointments = async() => {
        const uId = this.state.userId
        let exists = false
        let boosterIds = []

        await FIRESTER.once('value', snapshot => {
                snapshot.forEach(snap => {
                pupil = snap.val().pupil
                mentor = snap.val().mentor

                if(uId === pupil || uId === mentor) {
                    exists = true
                    boosterIds.push(snap.key)
                }
                })
            })
            .then(() => {
                if(exists) {
                    this._getAppointments(boosterIds)
                }
            })
            .catch(error => alert(error))
    }

    _getAppointments = (boosterIds) => {
        let appArr = []

        for(let key in boosterIds) {
        let arr = []

        try {
            FIRESTER.child(boosterIds[key]).child('appointments')
            .once('value', snapshot => {
                snapshot.forEach(snap => {
                arr.push(snap)
                })
            })
            .then(() => {
                // append arrays
                appArr = appArr.concat(arr)
                this.setState({ appoints: appArr })
            })
            .catch(error => alert(error))
        }
        catch(error) { alert(error.message) }
        }
    }

    render() {
        const navigation = this.props.navigation
        return(
            <Card>
                <List
                    dataArray={this.state.appoints}
                    renderRow={(item) => {
                    return(
                    <ListItem>
                        <Left style={{ flex: 1 }}>
                            <Ionicons name={calendar} size={50} color="#0d47a1" />
                            <Body style={{ marginLeft: 16 }}>
                                <Text style={{ fontSize: 19 }}>{moment(item.val().startTime).format('Do')}</Text>
                                <Text style={{ fontSize: 13 }}>{moment(item.val().startTime).format('MMM / YYYY')}</Text>
                            </Body>
                        </Left>
                        <Right style={{ flex: 1 }}>
                            <Button transparent
                                onPress={() => navigation.navigate('End', {
                                    appointmentId: item.key,
                                    startTime: item.val().startTime,
                                    endTime: item.val().endTime,
                                    totalTime: item.val().totalTime,
                                    status: item.val().status,
                                })}>
                                <Ionicons name={menu} size={25} color='#000' style={{ marginLeft: 20 }} />
                            </Button>
                        </Right>
                    </ListItem>
                    )
                }}>
                </List>
            </Card>
        )
    }
}