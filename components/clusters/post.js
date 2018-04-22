import React, { Component } from 'react'
import {
    Container,
    Header,
    Content,
    Text,
    Left,
    Right,
    Body,
    Title,
    Button,
    Form, 
    Item, 
    Input, 
    Textarea,
    Label,
    Picker,
    Card,
    CardItem
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import Style from '../style'

export default class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: 'How'
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        })
    }

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
                        <Title style={Style.black}>Post a Quiz</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                            <Ionicons name='ios-more' size={26} style={Style.black} />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <Form>
                        <Picker
                        mode="dropdown"
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)} >
                            <Picker.Item label="How" value="How" />
                            <Picker.Item label="What" value="What" />
                            <Picker.Item label="Why" value="Why" />
                        </Picker>
                        <Textarea rowSpan={5} style={{ marginTop: 5 }}
                            bordered placeholder="your question here ..." />
                        <Button block>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}