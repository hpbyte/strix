import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  List,
  ListItem
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import Style from '../style';
import firebaseService from '../service/firebase';
import { signedOut } from '../auth/check'

const FIREBASE = firebaseService.database();

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '', dob: '' }
  }

  componentDidMount() {
    firebaseService.auth().onAuthStateChanged(user => {
      if(user) {
        // getting user data on db
        try{
          FIREBASE.ref('users/'+user.uid).once('value').then(snapshot => {
            this.setState({
              name: snapshot.val().name,
              dob: snapshot.val().dob
            })
          })
        } catch(error) {
          alert(error)
        }
        // getting email from auth
        this.setState({
          email: user.email
        })
      }
    });
  }

  onSignOut() {
    firebaseService.auth().signOut()
      .then(() => {
        // remove from storage
        signedOut();        
        this.props.navigation.navigate('SignedOut')
      })
      .catch((error) => {
        alert(error)
      });
  }

  render() {
    return(
      <Container>
        {/* <Header style={Style.header}>
          
        </Header> */}
        <Grid>
          <Row size={8} style={{ backgroundColor: '#000' }}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
                style={{ marginLeft: 15 }} >
                <Ionicons name='ios-arrow-back' size={28} color='#fff' />
              </Button>
            </Left>
            <Body>
              <Title style={Style.white}>Your Profile</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={this.onSignOut.bind(this)}
                style={{ width: 27, marginRight: 10 }} >
                <Ionicons name='ios-log-out' size={27} color='#fff' />
              </Button>
            </Right>
          </Row>
          <Row size={27} style={style.row1}>
            <Thumbnail large source={require('../../assets/default.png')} />
          </Row>
          <Row size={65}>
            <Content>
              <List>
                <ListItem icon>
                  <Left>
                    <Ionicons name='ios-contact' size={30} />
                  </Left>
                  <Body>
                    <Text>{this.state.name}</Text>
                  </Body>
                  <Right/>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Ionicons name='ios-mail' size={30} />
                  </Left>
                  <Body>
                    <Text>{this.state.email}</Text>
                  </Body>
                  <Right/>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Ionicons name='ios-card' size={30} />
                  </Left>
                  <Body>
                    <Text>{this.state.dob}</Text>
                  </Body>
                  <Right/>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Ionicons name='ios-school' size={30} />
                  </Left>
                  <Body>
                    <Text>Oxford University</Text>
                  </Body>
                  <Right/>
                </ListItem>
              </List>
            </Content>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  row1: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  }
})