import React, { Component } from 'react'
import { Platform, View } from 'react-native';
import { Container, Header, Body, Left, Right, Button, Text, Title, } from 'native-base'
import firebaseService from '../service/firebase'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import Style from '../style'

const FIREBASE = firebaseService.database()

export default class Info extends Component {
    constructor(props) {
        super(props)

        const { params } = this.props.navigation.state
        const userId = params ? params.userId : null

        this.state = { uId: userId, name: '', school: '', uni: '', job: '', image: null }
    }

    componentDidMount() {
        this._getUserInfo()
    }

    _getUserInfo = async() => {
        await FIREBASE.ref('users').child(this.state.uId).once('value', snapshot => {
            this.setState({
                name: snapshot.val().name,
                school: snapshot.val().school,
                uni: snapshot.val().uni,
                job: snapshot.val().job
            })
        })
    }

    render() {
        const { uId, name, school, uni, job } = this.state
        return(
            <Container>
                {Platform.OS === 'ios' ? <View style={{height: 20, backgroundColor: '#fff'}} /> : null}
                <Header noShadow style={[Style.bgBlack, { borderBottomWidth: 0, paddingTop: 0 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={28} color='#fff' />
                        </Button>
                    </Left>
                    <Body style={Style.flexCenter}>
                        <Title style={Style.white}>{name}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Bar />
                <Grid>
                    {/* <Row size={25} style={style.avater}>
                        {image !== null ? (<Thumbnail large source={{ uri: image }} />) : (<Thumbnail large source={require('../../assets/default.png')} />)}
                    </Row>
                    <Row size={75}>
                    
                    </Row> */}
                </Grid>
            </Container>
        )
    }
}