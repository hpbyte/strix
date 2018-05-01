import React, { Component } from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { mail, lock, user } from '../partials/icons'
import firebaseService from '../service/firebase';
import style from './style';
import { signedIn } from '../auth/check'

const FIREBASE = firebaseService.database();

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '', 
      password: '',
      error: '', 
      loading: false 
    }
  }

  onSignupPress() {
    this.setState({ error: '', loading: true });
    const { name, email, password, dob } = this.state;

    firebaseService.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // add it to the database
        FIREBASE.ref('users/'+firebaseService.auth().currentUser.uid).set(
          {
            name: name
          }, (error) => {
            if(error) {
              alert(error.message)
            }              
          }
        )
        // store that the user is logged in
        signedIn()
        // alert('Signup Successful!');
        this.props.navigation.navigate('SignedIn');
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  render() {
    return(
      <Container>
        <KeyboardAvoidingView style={{flex: 1}} behavior="position" 
          keyboardVerticalOffset={-30}>
          <Text style={style.strix}>Strix</Text>
          <Item rounded style={style.item} >
            <Ionicons name={user} size={25} style={style.inputIcon} />
            <Input 
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              style={style.input} placeholder="Name"
              keyboardAppearance='dark'
              returnKeyType='next' />
          </Item>
          <Item rounded style={style.item} >
            <Ionicons name={mail} size={25} style={style.inputIcon} />
            <Input 
              value={this.state.email} 
              onChangeText={email => this.setState({email})} 
              style={style.input} placeholder="Email"
              keyboardType='email-address'
              keyboardAppearance='dark'
              returnKeyType='next' />
          </Item>
          <Item rounded style={style.item} >
            <Ionicons name={lock} size={25} style={style.inputIcon} />
            <Input 
              value={this.state.password} 
              onChangeText={password => this.setState({password})} 
              secureTextEntry style={style.input} placeholder="Password"
              keyboardAppearance='dark'
              returnKeyType='done' />
          </Item>
          <Button rounded dark style={style.btn}
            onPress={this.onSignupPress.bind(this)}>
            <Text style={style.txtLogin}>Ok Go</Text>
          </Button>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
