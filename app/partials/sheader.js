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

export default class Sheader extends React.Component {
    render() {
        return(
        <Header style={Style.header} noShadow>
            <Left style={{ flex: 1 }}>
                <Button
                    transparent
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Ionicons name={user} size={26} style={Style.black}/>
                </Button>
            </Left>
            <Body style={Style.flexCenter}>
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