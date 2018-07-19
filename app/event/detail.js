import React, { Component } from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import { Text, Card, CardItem, Content } from 'native-base';
import { Grid, Row } from "react-native-easy-grid";
import moment from 'moment'
import Style from "../style";
import firebaseService from "../service/firebase";

const FIREVENT = firebaseService.database().ref('events')
const WIDTH = Dimensions.get('screen').width

export default class Detail extends Component {
    constructor(props) {
        super(props) 

        const { params } = this.props.navigation.state
        const eid = params.eventId ? params.eventId : null

        this.state = {
            eId: eid, 
            title: '',
            bgImg: null,
            dateTime: '',
            desp: '',
            place: '',
            lati: '',
            longi: ''
        }
    }

    componentDidMount() {
        this._getEventDetails()
    }

    _getEventDetails = async() => {
        await FIREVENT.child(this.state.eId).once('value', snapshot => {
            this.setState({
                title: snapshot.val().title,
                bgImg: snapshot.val().bgimg,
                dateTime: snapshot.val().datetime,
                desp: snapshot.val().description,
                place: snapshot.val().location.name,
                lati: snapshot.val().location.latitude,
                longi: snapshot.val().location.longitude
            })
        })
    }

    render() {
        const { 
            title, desp, dateTime, place, lati, longi, bgImg
         } = this.state

        return(
            <Grid>
                <Row size={30}>
                    <ImageBackground source={{ uri: bgImg }} style={{ width: WIDTH }} />
                </Row>
                <Row size={70}>
                    <Content>
                        <Card>
                            <CardItem bordered>
                                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{title}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={Style.red}>
                                    {moment(dateTime).format('ddd, MMM Do, YYYY @ h A')}
                                </Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Details</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text>{desp}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Location</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text>{place}</Text>
                            </CardItem>
                        </Card>
                    </Content>
                </Row>
            </Grid>
        )
    }
}