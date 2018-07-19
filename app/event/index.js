import React, { Component } from 'react';
import { 
    View, TouchableHighlight, TouchableOpacity, FlatList, ImageBackground, StyleSheet, Dimensions
} from 'react-native';
import { Container, Content, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Row, Col } from 'react-native-easy-grid'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { map } from '../partials/icons'
import Sheader from '../partials/sheader'
import Bar from '../partials/bar'
import Map from '../map'
import Style from '../style'
import firebaseService from '../service/firebase'

const FIREVENT = firebaseService.database().ref('events')
const WIDTH = Dimensions.get('screen').width / 1.05
const HEIGHT = Dimensions.get('screen').height / 4

class Event extends Component {
    constructor(props) {
        super(props)

        this.state = { events: [] }
        this.generateRandomNum.bind(this)
    }

    componentDidMount() {
        this._getEvents()
    }

    generateRandomNum = () => {
        return Math.floor(Math.random() * 100)
    }

    _getEvents = async() => {
        let arr = []
        await FIREVENT.once('value', (snapshot) => {
            snapshot.forEach(snap => { arr.push(snap) })
        }).then(() => {
            this.setState({ events: arr })
        }).catch(err => alert(err))
    }

    render() {
        return(
            <Container>
                <Sheader navigation={this.props.navigation} />
                <Bar />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.events}
                        renderItem={({item}) => (
                            <TouchableOpacity id={item.key}>
                                <ImageBackground source={{ uri: item.val().bgimg }} style={style.bgImg} borderRadius={8} >
                                    <Col>
                                        <Row size={65}></Row>
                                        <Row size={35} style={style.bgTxt}>
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={Style.red}>
                                                    {moment(item.val().datetime).format('ddd, MMM Do, YYYY @ h A')}
                                                </Text>
                                                <Text style={{ fontWeight: 'bold' }}>{item.val().title}</Text>
                                            </View>
                                        </Row>
                                    </Col>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableHighlight style={Style.fab} 
                        onPress={() => this.props.navigation.navigate('Map')}>
                        <Ionicons name={map} color='#fff' size={30} />
                    </TouchableHighlight>
                </View>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    bgImg: {
        width: WIDTH,
        height: HEIGHT,
        margin: 10,
        padding: 0,
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 }
    },
    bgTxt: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    }
})

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