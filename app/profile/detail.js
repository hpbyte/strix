import React, { Component } from 'react';
import {
  Content,
  Left,
  Body,
  Right,
  Text,
  Button,
  List,
  ListItem,
  Card,
  CardItem
} from 'native-base';
import firebaseService from '../service/firebase';
import { Ionicons } from '@expo/vector-icons';
import { school, work, user, mail, card } from '../partials/icons'
import style from './style'

const FIREBASE = firebaseService.database();

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '', dob: '', school: '', uni: '', degrees: '', work: '' }
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
        } catch(error) { alert(error) }
        // getting email from auth
        this.setState({ email: user.email })
      }
    });
  }

  render() {
    return(
      <Content>
        <Card>
          <CardItem header bordered>
          <Text onPress={() => alert('edit profile')}>Edit Profile</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={user} size={30} />
            <Text style={style.pdlf}>Name</Text>
            <Text style={style.pdlf} note>{this.state.name}</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={mail} size={30} />
            <Text style={style.pdlf}>Email Address</Text>
            <Text style={style.pdlf} note>{this.state.email}</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={card} size={30} />
            <Text style={style.pdlf}>Date-of-Birth</Text>
            <Text style={style.pdlf} note>{this.state.dob}</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={school} size={30} />
            <Text style={style.pdlf}>High School</Text>
            <Text style={style.pdlf} note>{this.state.dob}</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={school} size={30} />
            <Text style={style.pdlf}>University</Text>
            <Text style={style.pdlf} note>{this.state.dob}</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={school} size={30} />
            <Text style={style.pdlf}>Degrees & Certifications</Text>
            <Text style={style.pdlf} note>{this.state.dob}</Text>
          </CardItem>
          <CardItem>
            <Ionicons name={work} size={30} />
            <Text style={style.pdlf}>Job</Text>
            <Text style={style.pdlf} note>{this.state.dob}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
