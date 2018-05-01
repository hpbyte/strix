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

    this.state = { name: '', email: '', password: '', error: null, loading: false }
  }

  onSignupPress() {
    this.setState({ error: '', loading: true });
    const { name, email, password, dob } = this.state;

    firebaseService.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // add it to the database
        FIREBASE.ref('users/'+firebaseService.auth().currentUser.uid).set({
            name: name
        })
        // store that the user is logged in
        signedIn()
        this.props.navigation.navigate('SignedIn');
      })
      .catch((err) => {
        this.setState({ error: err.code })
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
          <Item 
            error={this.state.error == 'auth/email-already-in-use'  ? true : false} 
            error={this.state.error == 'auth/invalid-email'  ? true : false} 
            rounded style={style.item} >
            <Ionicons name={mail} size={25} style={style.inputIcon} />
            <Input 
              value={this.state.email} 
              onChangeText={email => this.setState({email})} 
              style={style.input} placeholder="Email"
              keyboardType='email-address'
              keyboardAppearance='dark'
              returnKeyType='next' />
          </Item>
          {this.state.error == "auth/email-already-in-use" ? <Text style={style.errorTxt}>Email is already used</Text> : null}
          {this.state.error == "auth/invalid-email" ? <Text style={style.errorTxt}>Invalid Email</Text> : null}
          <Item error={this.state.error == "auth/weak-password" ? true : false} rounded style={style.item} >
            <Ionicons name={lock} size={25} style={style.inputIcon} />
            <Input 
              value={this.state.password} 
              onChangeText={password => this.setState({password})} 
              secureTextEntry style={style.input} placeholder="Password"
              keyboardAppearance='dark'
              returnKeyType='done' />
          </Item>
          {this.state.error == "auth/weak-password" ? <Text style={style.errorTxt}>Weak Password</Text> : null}
          <Button rounded dark style={style.btn}
            onPress={this.onSignupPress.bind(this)}>
            <Text style={style.txtLogin}>Ok Go</Text>
          </Button>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
