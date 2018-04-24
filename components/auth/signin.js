import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
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

    this.state = { email: '', password: '', error: '', loading: false };
  }

  onSigninPress() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    firebaseService.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        // store that the user is logged in
        signedIn();
        // alert('Logged In')
        this.props.navigation.navigate("SignedIn")
      })
      .catch((err) => {
        // alert(err);
        this.setState({ error: err, loading: false })
      })
  }

  render() {
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior='position' enabled>
        <Text style={style.strix}>Strix</Text>
        <Item rounded style={style.item} >
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
        <Item rounded style={style.item} >
          <Ionicons name={lock} size={25} style={style.inputIcon} />
          <Input 
            value={this.state.password} 
            onChangeText={password => this.setState({password})} 
            secureTextEntry={true} style={style.input}
            placeholder="Password" placeholderTextColor="#000"
            keyboardAppearance='dark'
            returnKeyType='done' />
        </Item>
        <Button rounded dark style={style.btn}
          onPress={this.onSigninPress.bind(this)}>
          <Text style={style.txtLogin}>Ok Go</Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}
