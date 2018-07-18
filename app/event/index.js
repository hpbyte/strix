import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Container, Content } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { map } from '../partials/icons'
import Sheader from '../partials/sheader'
import Bar from '../partials/bar'
import Map from '../map'
import Style from '../style'
import firebaseService from '../service/firebase'

const FIREVENT = firebaseService.database().ref('events')

class Event extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: []
        }
    }


    _getEvents = async() => {
        let arr = []
        await FIREVENT.once('value', (snapshot) => {
            snapshot.forEach(snap => { arr.push(snap.val()) })
        }).then(() => {
            this.setState({ events: arr })
        })
    }

    render() {
        return(
            <Container>
                <Sheader navigation={this.props.navigation} />
                <Bar />
                <View style={{ flex: 1 }}>
                    <Content>
                        
                    </Content>
                    <TouchableHighlight style={Style.fab} 
                        onPress={() => this.props.navigation.navigate('Map')}>
                        <Ionicons name={map} color='#fff' size={30} />
                    </TouchableHighlight>
                </View>
            </Container>
        )
    }
}

const EventStacker = StackNavigator(
    {
        Event: { screen: Event },
        Map: { screen: Map }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Event'
    }
)

export default EventStacker