import React, { Component } from 'react';
import { View, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Container
} from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { mail, lock } from '../partials/icons'
import firebaseService from '../service/firebase';
import style from './style';
import { signedIn } from './check'

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', error: null, loading: false };
  }

  async _signIn() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    await firebaseService.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
        // store that the user is logged in
        signedIn();
        this.props.navigation.navigate("SignedIn")
      })
      .catch((err) => {
        this.setState({ error: err.code, loading: false })
      })
  }

  render() {
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="position"
      keyboardVerticalOffset={-30}>
        <Text style={style.strix}>Strix</Text>
        <Item 
          error={this.state.error == "auth/invalid-email" ? true : false} 
          error={this.state.error == "auth/user-not-found" ? true : false} 
          error={this.state.error == "auth/user-disabled" ? true : false} 
          rounded style={style.item} >
          <Ionicons name={mail} size={25} style={style.inputIcon} />
          <Input 
            value={this.state.email} 
            onChangeText={email => this.setState({email})} 
            style={style.input} placeholder="Email"
            placeholderTextColor="#000"
            keyboardType='email-address'
            keyboardAppearance='dark'
            returnKeyType='next' />
        </Item>
        {this.state.error == "auth/invalid-email" ? <Text style={style.errorTxt}>Invalid Email!</Text> : null}
        {this.state.error == "auth/user-not-found" ? <Text style={style.errorTxt}>User not found!</Text> : null}
        {this.state.error == "auth/user-disabled" ? <Text style={style.errorTxt}>User is disabled!</Text> : null}
        <Item error={this.state.error == "auth/wrong-password" ? true : false} rounded style={style.item} >
          <Ionicons name={lock} size={25} style={style.inputIcon} />
          <Input 
            value={this.state.password} 
            onChangeText={password => this.setState({password})} 
            secureTextEntry={true} style={style.input}
            placeholder="Password" placeholderTextColor="#000"
            keyboardAppearance='dark'
            returnKeyType='done' />
        </Item>
        {this.state.error == "auth/wrong-password" ? <Text style={style.errorTxt}>Incorrect password!</Text> : null}
        <Button rounded dark style={style.btn}
          onPress={this._signIn.bind(this)}>
          <Text style={style.txtLogin}>Ok Go</Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}
