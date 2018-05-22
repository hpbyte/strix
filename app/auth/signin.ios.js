import React, { Component } from 'react';
import {
  View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput
} from 'react-native';
import { Container, Button, Text } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { mail, lock } from '../partials/icons'
import firebaseService from '../service/firebase';
import { signedIn } from './check'
import style from './style';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', error: null, loading: false };
  }

  _signIn = async() => {
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
    const error = this.state.error

    return(
      <Container>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Grid>
              <Row size={30} style={style.verticalCenter}>
                <Text style={style.strix}>Strix</Text>
              </Row>
              <Row size={5}></Row>
              <Row size={8} style={style.inputView}>
                <Col size={15} style={style.verticalCenter}>
                  <Ionicons name={mail} size={25} style={style.inputIcon} />
                </Col>
                <Col size={85} style={style.verticalCenter}>
                  <TextInput 
                    value={this.state.email} 
                    onChangeText={email => this.setState({email})} 
                    style={style.input} placeholder="Email"
                    placeholderTextColor="#000"
                    clearButtonMode="while-editing"
                    keyboardType='email-address'
                    returnKeyType='next'
                  />
                </Col>
              </Row>
              <Row size={5}>
                {error === "auth/invalid-email" ? <Text style={style.errorTxt}>Invalid Email!</Text> : null}
                {error === "auth/user-not-found" ? <Text style={style.errorTxt}>User not found!</Text> : null}
              </Row>
              <Row size={8} style={style.inputView}>
                <Col size={15} style={style.verticalCenter}>
                  <Ionicons name={lock} size={25} style={style.inputIcon} />
                </Col>
                <Col size={85} style={style.verticalCenter}>
                  <TextInput 
                    value={this.state.password} 
                    onChangeText={password => this.setState({password})} 
                    secureTextEntry={true} style={style.input}
                    placeholder="Password" placeholderTextColor="#000"
                    clearButtonMode="while-editing"
                    returnKeyType='done'
                  /> 
                </Col>
              </Row>
              <Row size={5}>
                {error === "auth/wrong-password" ? <Text style={style.errorTxt}>Incorrect password!</Text> : null}
              </Row>
              <Row size={5}></Row>
              <Row size={15} style={style.verticalCenter}>
                <Button rounded dark style={style.btn}
                  onPress={this._signIn.bind(this)}>
                  <Text style={style.txtLogin}>Login</Text>
                </Button>
              </Row>
              <Row size={15}></Row>
            </Grid>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
