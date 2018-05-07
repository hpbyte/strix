import React, { Component } from 'react'
import { Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {
    Root,
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
    CardItem,
    Toast,
    ActionSheet
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { alert, more } from '../../partials/icons'
import firebaseService from '../../service/firebase'
import moment from 'moment'
import Style from '../../style'

const FIREBASE = firebaseService.database();

export default class Post extends Component {
    constructor(props) {
        super(props)

        const { params } = this.props.navigation.state
        const clust = params ? params.cluster : null

        this.state = { showToast: false, selected: 'What', quiz: '', duration: '', cluster: clust }
    }

    onValueChange(value) {
        this.setState({ selected: value })
    }

    _postQuiz = async() => {
        const { selected, quiz, duration, cluster } = this.state

        if(quiz !== '') {
            await FIREBASE.ref('questions').child(cluster).push(
                {
                    quiz: selected+" "+quiz,
                    userId: firebaseService.auth().currentUser.uid,
                    duration: '12-2-2019',
                    timestamp: moment().format("YYYY-MM-DD HH:mm")
                }, (error) => {
                    if(error) alert(error.message)
                }
            ).then(() => {
                this.setState({ selected: 'What', quiz: '' })

                Toast.show({
                    text: 'Successfully Submitted!',
                    buttonText: 'OK',
                    duration: 3000,
                    type: 'success',
                    position: 'top'
                })
            }).catch(error => alert(error))
        } else {
            Toast.show({
                text: 'Please write your question first!',
                buttonText: 'OK',
                duration: 3000,
                type: 'danger',
                position: 'top'
            })
        }        
    }

    componentWillUnmount() {
        Toast.toastInstance = null
        ActionSheet.actionsheetInstance = null
    }
    
    render() {
        return(
        <Root>
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
                            <Ionicons name={more} size={26} style={Style.black} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 50}>
                    <Card>
                        <CardItem>
                            <Ionicons name={alert} color="red" size={35} />
                            <Text style={style.infotxt}>Keep your question short and to the point</Text>
                        </CardItem>
                        <CardItem>
                            <Ionicons name={alert} color="green" size={35} />
                            <Text style={style.infotxt}>Phrase it like a question</Text>
                        </CardItem>
                        <CardItem>
                            <Ionicons name={alert} color="orange" size={35} />
                            <Text style={style.infotxt}>Check for grammar or spelling errors</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <Form>
                            <Picker
                            mode="dropdown"
                            iosHeader="Choose Type"
                            style={style.picker}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)} >
                                <Picker.Item label="What" value="What" />
                                <Picker.Item label="Why" value="Why" />
                                <Picker.Item label="How" value="How" />
                            </Picker>
                            <Textarea rowSpan={7} style={style.txtArea}
                                placeholder="your question here ..."
                                value={this.state.quiz}
                                onChangeText={quiz => this.setState({quiz})} />
                            <Button block style={style.submit}
                                onPress={this._postQuiz.bind(this)}>
                                <Text>Submit Quiz</Text>
                            </Button>
                        </Form>
                    </Card>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        </Root>
        )
    }
}

const style = StyleSheet.create({
    txtArea: {
        marginTop: 10,
        padding: 10
    },
    submit: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#2a4ff0'
    },
    infotxt: {
        marginLeft: 10
    },
    picker: {
        height: 60
    }
})