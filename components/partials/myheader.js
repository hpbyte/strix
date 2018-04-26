import React from 'react'
import {
    Header,
    Left,
    Body,
    Right,
    Text,
    Title,
    Button
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { user, search } from './icons'
import Style from '../style'

export default class MyHeader extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
        <Header style={Style.header}>
            <Left style={{ flex: 1 }}>
            <Button
                transparent
                onPress={() => props.navigation.navigate('Profile')}>
                <Ionicons name={user} size={26} style={Style.black}/>
            </Button>
            </Left>
            <Body style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Title style={Style.title}>Strix</Title>
            </Body>
            <Right style={{ flex: 1 }}>
            <Button transparent
                onPress={() => this.props.navigation.navigate('Search')}>
                <Ionicons name={search} size={26} style={Style.black}/>
            </Button>
            </Right>
        </Header>
        )
    }
}