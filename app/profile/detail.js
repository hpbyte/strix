import React, { Component } from 'react';
import {
  Left,
  Body,
  Right,
  Text,
  Button,
  List,
  ListItem
} from 'native-base';
import firebaseService from '../service/firebase';
import { Ionicons } from '@expo/vector-icons';

const FIREBASE = firebaseService.database();

export default class Detail extends Component {
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

  render() {
    return(
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
    );
  }
}
