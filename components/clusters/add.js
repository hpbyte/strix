import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Text,
    Left,
    Right,
    Body,
    Title,
    Button
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import Style from '../style'

export default class Add extends Component {
    render() {
        return(
            <Container>
                <Header style={Style.header}>
                    <Left style={{ flex: 1 }}>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={26} style={Style.black} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={Style.black}>Add Cluster</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                            <Ionicons name='ios-more' size={26} style={Style.black} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Text>hello from cluster addition</Text>
                </Content>
            </Container>
        )
    }
}