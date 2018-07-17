import React, { Component } from 'react'
import {
    Header, Left, Body, Right, Title, Button
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { user, search } from './icons'
import Style from '../style'

export default class Sheader extends Component {
    render() {
        return(
        <Header style={Style.header} noShadow>
            <Left style={{ flex: 1 }}>
                <Button
                    style={Style.leftBtn}
                    transparent
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Ionicons name={user} size={27} style={Style.black}/>
                </Button>
            </Left>
            <Body style={Style.flexCenter}>
                <Title style={Style.title}>Hippo</Title>
            </Body>
            <Right style={{ flex: 1 }}>
                <Button transparent
                    style={Style.rightBtn}
                    onPress={() => this.props.navigation.navigate('Search')}>
                    <Ionicons name={search} size={27} style={Style.black}/>
                </Button>
            </Right>
        </Header>
        )
    }
}